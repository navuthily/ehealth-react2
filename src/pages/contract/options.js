import {
  createOptions,
  ViewType,
  RichEditUnit
} from 'devexpress-richedit'

const options = createOptions()

options.bookmarks.visibility = true
options.bookmarks.color = '#ff0000'

options.confirmOnLosingChanges.enabled = false
options.confirmOnLosingChanges.message =
  'Are you sure you want to perform the action? All unsaved document data will be lost.'

options.fields.updateFieldsBeforePrint = true
options.fields.updateFieldsOnPaste = true
// options.document.protect = 'www'

options.mailMerge.activeRecord = 2
options.mailMerge.viewMergedData = true

// events
options.events.activeSubDocumentChanged = () => {}
options.events.autoCorrect = () => {}
options.events.calculateDocumentVariable = () => {}
options.events.characterPropertiesChanged = () => {}
options.events.contentInserted = () => {}
options.events.contentRemoved = () => {}
options.events.documentChanged = () => {}
options.events.documentFormatted = () => {}
options.events.documentLoaded = () => {}
options.events.gotFocus = () => {}
options.events.hyperlinkClick = () => {}
options.events.keyDown = () => {}
options.events.keyUp = () => {}
options.events.paragraphPropertiesChanged = () => {}
options.events.lostFocus = () => {}
options.events.pointerDown = () => {}
options.events.pointerUp = () => {}
options.events.saving = (e, s) => {
  console.log('saving ======>', e, s)
}
options.events.saved = (e) => {
  console.log('Saved', e)
}
options.events.selectionChanged = () => {}
options.events.customCommandExecuted = (s, e) => {
  
  switch (e.commandName) {
    case 'insertEmailSignature':
      s.document.insertParagraph(s.document.length)
      s.document.insertText(s.document.length, '_________')
      s.document.insertParagraph(s.document.length)
      s.document.insertText(s.document.length, 'Best regards,')
      s.document.insertParagraph(s.document.length)
      s.document.insertText(s.document.length, 'John Smith')
      s.document.insertParagraph(s.document.length)
      s.document.insertText(s.document.length, 'mailto:john@example.com')
      s.document.insertParagraph(s.document.length)
      s.document.insertText(s.document.length, '+1 (818) 844-0000')
      break    
    default:
      console.log('customCommandExecuted')
  }
}

options.unit = RichEditUnit.Inch

options.view.viewType = ViewType.PrintLayout
options.view.simpleViewSettings.paddings = {
  left: 15,
  top: 15,
  right: 15,
  bottom: 15,
}
options.exportUrl = 'http://localhost:3030/richserver'

options.readOnly = false
// options.width = '1400px'
// options.height = '1400px'

export default options
