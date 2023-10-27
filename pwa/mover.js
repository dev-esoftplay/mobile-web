const fs = require('fs');
const shell = require('child_process').execSync;
const merge = require('lodash/merge')
const { moduleName } = require("./index")
const assetsFonts = "assets/fonts"
/* copy directory */
if (fs.existsSync('../esoftplay/esp.ts')) {
	try {
		if (fs.existsSync('../esoftplay/modules/' + moduleName))
			shell('rm -r ../esoftplay/modules/' + moduleName)
		shell("cp -r ./" + moduleName + " ../esoftplay/modules/")
	} catch (error) {

	}
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

/* copy web configs  */
try {
	if (fs.existsSync(rootPath + 'App.tsx')) {
		if (fs.existsSync(rootPath + 'webpack.config.ts')) {
			shell('rm -f ' + rootPath + 'webpack.config.ts')
		}
		shell('cp -n -r ./root/* ' + rootPath)
		console.log("Web Configs added!")
	}
} catch (error) {

}

/* add service worker */
if (fs.existsSync(rootPath + "App.tsx")) {
	try {
		let pack = fs.readFileSync(rootPath + "App.tsx", { encoding: 'utf8' })
		pack = pack.replace(`onAction(x));

export`, `onAction(x));
import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";
serviceWorkerRegistration.register();
export
`)
		fs.writeFileSync(rootPath + "App.tsx", pack)
		console.log("App.tsx updated !")
	} catch (error) {

	}
}