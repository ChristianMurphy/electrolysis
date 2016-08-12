import test from 'ava'
import path from 'path'
import {Application} from 'spectron'

test.beforeEach(async t => {
  const electronExecutable = process.platform === 'win32' ? 'electron.exe' : 'electron'
  t.context.app = new Application({
    path: path.resolve(__dirname, '..', 'node_modules', 'electron-prebuilt', 'dist', electronExecutable),
    args: ['../src/main.js']
  })

  await t.context.app.start()
})

test.afterEach.always(async t => {
  await t.context.app.stop()
})

test('window loads', async t => {
  const app = t.context.app
  await app.client.waitUntilWindowLoaded()

  const win = app.browserWindow
  t.is(await app.client.getWindowCount(), 1)
  t.false(await win.isMinimized())
  t.false(await win.isDevToolsOpened())
  t.true(await win.isVisible())

  const {width, height} = await win.getBounds()
  t.true(width > 0)
  t.true(height > 0)
})

test.afterEach.always(async t => {
  try {
    await t.context.app.stop()
  } catch (err) {}
})

test('file chooser loads', async t => {
  const app = t.context.app
  await app.client.waitUntilWindowLoaded()

  const win = app.browserWindow
  t.is(await win.getTitle(), 'Electrolysis')
  t.is(await app.client.getText('#ele-button'), 'CHOOSE FILES')
})
