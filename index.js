#!/usr/bin/env node

const join = require('path').join

const i18nextScanner = require(join(process.cwd(), 'i18next-scanner.config'))

const { lngs, ns, defaultValue } = i18nextScanner.options

const pathTemplate = i18nextScanner.options.resource.savePath

const getObjectValues = (obj) => (obj && typeof obj === 'object') ? Object.values(obj).map(getObjectValues).flat() : [obj]

const failingFiles = lngs.reduce((a, lng) => a.concat(ns.reduce((b, n) => b.concat([join(process.cwd(), pathTemplate.replace('{{lng}}', lng).replace('{{ns}}', n))]), [])), []).reduce((c, filePath) => getObjectValues(require(filePath)).includes(defaultValue) ? c.concat([filePath.replace(process.cwd(), '')]) : c, [])

if (failingFiles.length > 0) throw new Error(`Nonlocalized entry "${defaultValue}" found in [${failingFiles.reduce((a, c) => `${a}, ${c}`)}]`)
