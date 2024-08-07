const fs = require('fs');
const shell = require('child_process').execSync;
const merge = require('lodash/merge')
const { moduleName } = require("./index")
const assetsFonts = "assets/fonts"
/* copy directory */
if (fs.existsSync('../esoftplay/esp.ts')) {
	if (fs.existsSync('../esoftplay/modules/' + moduleName))
		shell('rm -r ../esoftplay/modules/' + moduleName)
	shell("cp -r ./" + moduleName + " ../esoftplay/modules/")
} else {
	throw "Mohon install esoftplay package terlebih dahulu"
}

function injectConfig(configPath) {
	if (fs.existsSync(configPath)) {
		const exsConf = require(configPath)
		const conf = require("./config.json")
		let _cf = merge({ config: conf }, exsConf)
		fs.writeFileSync(configPath, JSON.stringify({ ..._cf }, undefined, 2))
	}
}

/* injectConfig */
injectConfig("../../config.json")
injectConfig("../../config.live.json")
injectConfig("../../config.debug.json")

/* move assets */
if (fs.existsSync("./assets/")) {
	if (!fs.existsSync("../../assets/" + moduleName))
		shell("mkdir -p ../../assets/" + moduleName)
	try {
		shell("cp -r -n ./assets/* ../../assets/" + moduleName + "/")
	} catch (error) { }
}

if (fs.existsSync("./fonts/")) {
	if (!fs.existsSync("../../" + assetsFonts))
		shell("mkdir -p ../../" + assetsFonts)
	try {
		shell("cp -r -n ./fonts/* ../../" + assetsFonts + "/")
	} catch (error) { }
}

/* inject lang */
if (fs.existsSync("./id.json")) {
	let moduleLang = require("./id.json")
	if (fs.existsSync("../../assets/locale/id.json")) {
		let projectLang = require("../../assets/locale/id.json")
		let _lg = merge(moduleLang, projectLang)
		moduleLang = { ..._lg }
	}
	fs.writeFileSync("../../assets/locale/id.json", JSON.stringify(moduleLang, undefined, 2))
}

/* inject libs */
if (fs.existsSync("./libs.json")) {
	let libs = require("./libs.json")
	let libsToSkip = []
	libs.forEach((element, index) => {
		console.log(element)
		if (fs.existsSync("../../node_modules/" + element)) {
			libsToSkip.push(element)
		}
	})
	if (libsToSkip.length > 0) {
		libsToSkip.forEach((lib) => {
			libs = libs.filter((x) => x != lib)
			console.log(lib + " is exist, Skipped")
		})
	}
	if (libs.length > 0) {
		console.log("mohon tunggu ..")
		console.log("installing \n" + libs.join("\n"))
		shell("cd ../../ && expo install " + libs.join(" && expo install "))
	}
	console.log("Success..!")
}




const rootPath = '../../'
const espPath = '../esoftplay/'

/* fix error ts */
if (fs.existsSync(espPath + 'error.ts')) {
	let errorTsInFile = fs.readFileSync(espPath + 'error.ts', { encoding: 'utf-8' })
	errorTsInFile = errorTsInFile.replace("ErrorUtils.setGlobalHandler(myErrorHandler)", "//ErrorUtils[REMOVED by esoftplay web].setGlobalHandler(myErrorHandler)")
	fs.writeFileSync(espPath + 'error.ts', errorTsInFile)
	console.log("EsoftplayError fix !")
}

/* replace modules */
if (fs.existsSync(espPath + 'modules/lib/')) {
	shell('cp -r ./modules/lib/* ' + espPath + 'modules/lib')
	console.log("Modules replaced!")
}

/* copy web configs  */
if (fs.existsSync(rootPath + 'App.tsx')) {
	try {
		shell('cp -n -r ./root/* ' + rootPath)
	} catch (error) {

	}
	console.log("Web Configs added!")
}
/* add ts-node */
// shell("cd ../../ && npm install --save-dev ts-node")

/* replace curl logger */
if (!fs.existsSync(espPath + '/modules/log')) {
	if (fs.existsSync(espPath + "modules/lib/curl.ts")) {
		try {
			let curl = fs.readFileSync(espPath + "modules/lib/curl.ts", { encoding: 'utf8' })
			curl = curl.replace(`import { LogStateProperty } from 'esoftplay/cache/log/state/import';`, '')
			curl = curl.replace(`if (LogStateProperty) {
        var resJson = typeof resText == 'string' && ((resText.startsWith("{") && resText.endsWith("}")) || (resText.startsWith("[") && resText.endsWith("]"))) ? JSON.parse(resText) : resText
        LogStateProperty.doLogCurl(this.uri, this.url, post, this.isSecure, resJson)
      }`, '')
			curl = curl.replace(`if (LogStateProperty) {
        var resJson = typeof resText == 'string' && ((resText.startsWith("{") && resText.endsWith("}")) || (resText.startsWith("[") && resText.endsWith("]"))) ? JSON.parse(resText) : resText
        LogStateProperty.doLogCurl(this.uri, this.url, post, this.isSecure, resJson)
      }`, ``)
			fs.writeFileSync(espPath + "modules/lib/curl.ts", curl)
			console.log("LibCUrl Fix !")
		} catch (error) {

		}
	}
}

/* replace utils getInstallationID */
if (fs.existsSync(espPath + 'modules/lib/utils.ts')) {
	let utilsString = fs.readFileSync(espPath + 'modules/lib/utils.ts', { encoding: 'utf8' })
	utilsString = utilsString.replace(`resolve(String(Application.androidId || Application.getAndroidId()))`, `resolve(out)`)
	fs.writeFileSync(espPath + "modules/lib/utils.ts", utilsString)
}

/* replace user index logger */
if (fs.existsSync(espPath + "modules/user/index.tsx")) {
	let userIndexLimitReady = fs.readFileSync(espPath + "modules/user/index.tsx", { encoding: 'utf8' })
	try { userIndexLimitReady = userIndexLimitReady.replace(`let limitReady = 3`, 'let limitReady = 2') } catch (error) { }
	try { userIndexLimitReady = userIndexLimitReady.replace(`Font.loadAsync(fonts).then(() => r())`, "r()") } catch (error) { }
	try { userIndexLimitReady = userIndexLimitReady.replace(`LibUpdaterProperty.check()`, '') } catch (error) { }
	try { userIndexLimitReady = userIndexLimitReady.replace(`<Worker.View />`, "<></>") } catch (error) { }
	try {
		userIndexLimitReady = userIndexLimitReady.replace(`useEffect(() => {
			if (!loading) {
				setTimeout(() => {
					LibVersion.check()
				}, 0);
			}
		}, [loading])`, '')
	} catch (error) {

	}

	fs.writeFileSync(espPath + "modules/user/index.tsx", userIndexLimitReady)
	console.log("user Index limit ready Fix !")
}
/* replace start prpject */
if (fs.existsSync(rootPath + "package.json")) {
	let pack = fs.readFileSync(rootPath + "package.json", { encoding: 'utf8' })
	pack = pack.replace(`"start": "esp start && npx expo start --dev-client",`, '"start": "esp start && npx expo start --web",')
	fs.writeFileSync(rootPath + "package.json", pack)
	console.log("package json ready Fix !")
}

/* replace globalstate */

if (fs.existsSync(espPath + "/global.ts")) {
	let pack = fs.readFileSync(espPath + "/global.ts", { encoding: 'utf8' })
	pack = pack.replace(`const STORAGE = o?.inFile ? Storage : AsyncStorage`, 'const STORAGE = AsyncStorage')
	fs.writeFileSync(espPath + "/global.ts", pack)
	console.log("globalState fix!")
}
