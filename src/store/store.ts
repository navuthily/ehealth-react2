import { configureStore, combineReducers } from '@reduxjs/toolkit';
import tagViews from 'store/module/tagViews';
import paramsComponent from 'store/module/paramsComponent';

// // https://webpack.js.org/guides/dependency-management/#requirecontext
// const modulesFiles = require.context('./module', true, /\.js$/)
// // you do not need `import app from './modules/app'`
// // it will auto require all vuex module from modules file
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   // set './app.js' => 'app'
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)
//   modules[moduleName] = value.default
//   return modules
// }, {})


// const reducer = {
//     decrement: decrement,
//     increment: increment,
//   }


const reducer = combineReducers({
        tagViews: tagViews,
        paramsComponent: paramsComponent,
        
})

const store = configureStore(
    {
        reducer,
        // screenreducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        }),
    })
export default store


// import { combineReducers } from 'redux'

// import postsReducer from './posts'
// import     from './post'
// import commentsReducer from './comments'



// export default rootReducer