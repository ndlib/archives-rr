const AWS = require('aws-sdk')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const fs = require('fs')

const RED = process.env.CI ? '' : '\033[0;31m'
const GREEN = process.env.CI ? '' : '\033[0;32m'
const NC = process.env.CI ? '' : '\033[0m' // No Color

const getStage = () => {
  const data = process.argv[2].split('=')
  if (data[0] != 'stage') {
    throw "Stage variable not set. Example: node buildConfig.js stage=dev"
  }

  return data[1]
}

const findExport = (pre, stage, post, data) => {
  let key = (pre ? pre + '-' : '') + stage + (post ? '-' + post : '')

  for(let i = 0; i < data.length; i++) {
    if (data[i].Name == key) {
      return data[i].Value
    }
  }

  throw `${key} is not found in the cloudformation exports for stage "${stage}"`
}


const handler = async () => {
  try {
    const stage = getStage()
    let error = false

    const secretsMapping = [
      {
        secretPath: `/all/contentful/${stage}`,
        fields: [
          {
            secretKey: 'archivies/admin_departments',
            configKey: 'fullAccessDepartments',
            handler: (str) => str.split('","').map(val => val.replace(/"/g, ''))
          },
          {
            secretKey: 'archivies/admin_ids',
            configKey: 'fullAccessIds',
            handler: (str) => str.split(','),
          },
        ],
      },
    ]

    const secretsOutput = {}
    const secretsManager = new AWS.SecretsManager({ region: 'us-east-1' })
    for (let i = 0; i < secretsMapping.length; i++) {
      const mapping = secretsMapping[i]

      // Fetch secrets from AWS
      let data
      try {
        const params = {
          SecretId: mapping.secretPath,
        }
        data = await secretsManager.getSecretValue(params).promise()
      } catch(err) {
        console.error(`${RED}Unable to read ${mapping.secretPath} from secrets manager.${NC}`)
        if (process.env.CI) {
          console.error(err)
        }
        error = true
        continue
      }

      // Now process the individual fields that we have mapped to config values
      mapping.fields.forEach(fieldMap => {
        try {
          const rawValue = JSON.parse(data.SecretString)[fieldMap.secretKey]
          // Each value can have its own handler function to process the result after it is retrieved,
          // in case of string manipulations, splitting into an array, etc.
          secretsOutput[fieldMap.configKey] = (typeof fieldMap.handler === 'function')
              ? fieldMap.handler(rawValue)
              : rawValue
        } catch(err) {
          console.error(`${RED}Failed to parse value for ${fieldMap.configKey} from ${mapping.secretPath}.${NC}`)
          if (process.env.CI) {
            console.error(err)
          }
          error = true
        }
      })
    }

    if (error) {
      process.exit(1)
    }

    // Get dependent service urls from exports
    const apiList = [
      'contentfuldirect',
    ]
    const exportResults = await exec('aws cloudformation list-exports')
    const stdout = exportResults.stdout
    const data = stdout ? JSON.parse(stdout) : {}
    const services = {}

    for(let i = 0; i < apiList.length; i++) {
      try {
        // In test, use prod version of other services
        // Prod does not exist in testlibnd, so we have an environment variable to fake these service urls there
        services[apiList[i]] = findExport(apiList[i], stage, 'api-url', data['Exports'])
      } catch(err) {
        console.error(`${RED}${err}${NC}`)
        error = true
      }
    }

    if (error) {
      process.exit(1)
    }

    var stream = fs.createWriteStream(`${__dirname}/../src/Constants/config.js`);
    stream.once('open', function(fd) {
      stream.write(`module.exports = {\n`)
      stream.write('  services: {\n')
      for(let i = 0; i < apiList.length; i++) {
        stream.write("    " + apiList[i].replace('-', '') + ": '" + services[apiList[i]] + "',\n")
      }
      stream.write('  },\n')
      Object.keys(secretsOutput).forEach(key => {
        if (Array.isArray(secretsOutput[key])) {
          stream.write(`  ${key}: [\n`)
          secretsOutput[key].forEach(value => {
            stream.write(`    '${value}',\n`)
          })
          stream.write(`  ],\n`)
        } else {
          const isBool = ['true', 'false'].includes(secretsOutput[key].trim().toLowerCase())
          const value = isBool ? (secretsOutput[key].trim().toLowerCase() === 'true') : `'${secretsOutput[key]}'`
          stream.write(`  ${key}: ${value},\n`)
        }
      })
      stream.write(`}\n`)
      stream.end()
    })

    console.log(`${GREEN}Build config complete.${NC}`)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

handler()
