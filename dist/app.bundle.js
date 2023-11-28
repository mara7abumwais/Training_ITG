/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "yup":
/*!**********************!*\
  !*** external "yup" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("yup");

/***/ }),

/***/ "./DB/connection.js":
/*!**************************!*\
  !*** ./DB/connection.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectDB: () => (/* binding */ connectDB)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dotenv */ \"dotenv\");\n\r\n\r\ndotenv__WEBPACK_IMPORTED_MODULE_1__.config();\r\n\r\nconst connectDB = async()=>{\r\n    try{\r\n        await mongoose__WEBPACK_IMPORTED_MODULE_0__.connect(process.env.DB_URI);\r\n        console.log('Connect to DB');\r\n    }catch(err){\r\n        console.log(`Failed to connect to DB: ${err}`);\r\n    }\r\n};\n\n//# sourceURL=webpack://back-end-nodejs/./DB/connection.js?");

/***/ }),

/***/ "./DB/models/customer.model.js":
/*!*************************************!*\
  !*** ./DB/models/customer.model.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   customerModel: () => (/* binding */ customerModel)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n\r\n\r\nconst customerSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\r\n    name:{\r\n        type:String,\r\n        minlength:3,\r\n        maxlength:15,\r\n        trim:true,\r\n        required:true\r\n    },\r\n    email:{\r\n        type:String,\r\n        required:true,\r\n        unique: true,\r\n        validate:{\r\n            validator:function(value){\r\n                return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);\r\n            },\r\n            message:\"Invalid email format. Please enter a valid email address.\"\r\n        },\r\n    },\r\n    phone:{\r\n        type:String,\r\n        required:true,\r\n        validate:{\r\n            validator:function(value){\r\n                return /^\\d{10}$/.test(value);\r\n            },\r\n            message: 'Phone must have exactly 10 digits',\r\n        }\r\n    },\r\n    country:{\r\n        type:String,\r\n        required:true\r\n    },\r\n    isActive:{\r\n        type:Boolean,\r\n        default:true\r\n    }\r\n},{timestamps:true});\r\n\r\nconst customerModel = (0,mongoose__WEBPACK_IMPORTED_MODULE_0__.model)('Customer',customerSchema);\n\n//# sourceURL=webpack://back-end-nodejs/./DB/models/customer.model.js?");

/***/ }),

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var _DB_connection_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DB/connection.js */ \"./DB/connection.js\");\n/* harmony import */ var _routes_index_router_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes/index.router.js */ \"./routes/index.router.js\");\n/* harmony import */ var _routes_customer_customer_router_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/customer/customer.router.js */ \"./routes/customer/customer.router.js\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dotenv */ \"dotenv\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cors */ \"cors\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\ndotenv__WEBPACK_IMPORTED_MODULE_4__.config();\r\n\r\nconst createApp = () => {\r\n    const app = express__WEBPACK_IMPORTED_MODULE_0__();\r\n    app.use(cors__WEBPACK_IMPORTED_MODULE_5__());\r\n    app.use(express__WEBPACK_IMPORTED_MODULE_0__.json());\r\n    app.use('/', _routes_index_router_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\r\n    app.use('/api/customer', _routes_customer_customer_router_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\r\n    app.use('*', (req, res) => {\r\n        res.status(404).json('Page not found');\r\n    });\r\n    return app;\r\n};\r\n\r\nconst app = createApp();\r\n\r\n(0,_DB_connection_js__WEBPACK_IMPORTED_MODULE_1__.connectDB)();\r\nconst port = process.env.PORT || 3000;\r\napp.listen(port,()=>console.log(`Listening at port ${port}...`));\r\n\r\n\n\n//# sourceURL=webpack://back-end-nodejs/./app.js?");

/***/ }),

/***/ "./routes/customer/controller/customer.controller.js":
/*!***********************************************************!*\
  !*** ./routes/customer/controller/customer.controller.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addCustomer: () => (/* binding */ addCustomer),\n/* harmony export */   deleteCustomer: () => (/* binding */ deleteCustomer),\n/* harmony export */   getAllCustomers: () => (/* binding */ getAllCustomers),\n/* harmony export */   getCustomer: () => (/* binding */ getCustomer),\n/* harmony export */   updateCustomer: () => (/* binding */ updateCustomer)\n/* harmony export */ });\n/* harmony import */ var _DB_models_customer_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../DB/models/customer.model.js */ \"./DB/models/customer.model.js\");\n/* harmony import */ var _utils_handler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/handler.js */ \"./utils/handler.js\");\n/* harmony import */ var _utils_validateRequest_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/validateRequest.js */ \"./utils/validateRequest.js\");\n\r\n\r\n\r\n\r\nconst getAllCustomers = async(req,res)=>{\r\n    try{\r\n        const customers = await _DB_models_customer_model_js__WEBPACK_IMPORTED_MODULE_0__.customerModel.find();\r\n        const response = { state: 'Success', message: customers };\r\n        return (0,_utils_handler_js__WEBPACK_IMPORTED_MODULE_1__.handleResponse)(res,200,response)\r\n    }catch(err)\r\n    {\r\n        return (0,_utils_handler_js__WEBPACK_IMPORTED_MODULE_1__.handleError)(res,err);\r\n    }\r\n};\r\n\r\nconst getCustomer = async(req,res)=>{\r\n    try{\r\n        const {id} = req.params;\r\n        const customer = await _DB_models_customer_model_js__WEBPACK_IMPORTED_MODULE_0__.customerModel.findById(id);\r\n        if(!customer)\r\n            return (0,_utils_handler_js__WEBPACK_IMPORTED_MODULE_1__.handleError)(res,{message:'No customer with the given ID'});\r\n\r\n        const response = { state: 'Success', message: customer };\r\n        return (0,_utils_handler_js__WEBPACK_IMPORTED_MODULE_1__.handleResponse)(res,200,response);\r\n    }catch(err)\r\n    {\r\n        return (0,_utils_handler_js__WEBPACK_IMPORTED_MODULE_1__.handleError)(res,err);\r\n    }\r\n};\r\n\r\nconst addCustomer = async(req,res)=>{\r\n    try{\r\n        await (0,_utils_validateRequest_js__WEBPACK_IMPORTED_MODULE_2__.validateCustomer)(req.body);\r\n        const customer = new _DB_models_customer_model_js__WEBPACK_IMPORTED_MODULE_0__.customerModel(req.body);\r\n        const result = await customer.save();\r\n        const response = {state:'Success', message: result};\r\n        return (0,_utils_handler_js__WEBPACK_IMPORTED_MODULE_1__.handleResponse)(res,200,response);\r\n    }\r\n    catch (err) {\r\n        return (0,_utils_handler_js__WEBPACK_IMPORTED_MODULE_1__.handleError)(res,err);\r\n    }\r\n};\r\n\r\nconst updateCustomer = async(req,res)=>{\r\n    try{\r\n        const {id} = req.params;\r\n        await (0,_utils_validateRequest_js__WEBPACK_IMPORTED_MODULE_2__.validateCustomer)(req.body);\r\n        const customer = await _DB_models_customer_model_js__WEBPACK_IMPORTED_MODULE_0__.customerModel.findByIdAndUpdate({_id:id},req.body,{new:true});\r\n        if(!customer)\r\n            return (0,_utils_handler_js__WEBPACK_IMPORTED_MODULE_1__.handleError)(res,{message:'No customer with the given ID' });\r\n        const response = { state: 'Success', message: customer };\r\n        return (0,_utils_handler_js__WEBPACK_IMPORTED_MODULE_1__.handleResponse)(res,200,response);\r\n    }catch (err) {\r\n        return (0,_utils_handler_js__WEBPACK_IMPORTED_MODULE_1__.handleError)(res,err);\r\n    }\r\n};\r\n\r\nconst deleteCustomer = async(req,res)=>{\r\n    try{\r\n        const {id} = req.params;\r\n        const customer = await _DB_models_customer_model_js__WEBPACK_IMPORTED_MODULE_0__.customerModel.findByIdAndDelete(id);\r\n        if(!customer)\r\n            return (0,_utils_handler_js__WEBPACK_IMPORTED_MODULE_1__.handleError)(res,{message:'No customer with the given ID' });\r\n        const response = { state: 'Success', message: 'Customer successfully deleted' };\r\n        return (0,_utils_handler_js__WEBPACK_IMPORTED_MODULE_1__.handleResponse)(res,200,response);\r\n    }\r\n    catch(err)\r\n    {\r\n        return (0,_utils_handler_js__WEBPACK_IMPORTED_MODULE_1__.handleError)(res,err);\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://back-end-nodejs/./routes/customer/controller/customer.controller.js?");

/***/ }),

/***/ "./routes/customer/customer.router.js":
/*!********************************************!*\
  !*** ./routes/customer/customer.router.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var _controller_customer_controller_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller/customer.controller.js */ \"./routes/customer/controller/customer.controller.js\");\n\r\n\r\nconst router = express__WEBPACK_IMPORTED_MODULE_0__.Router();\r\n\r\nrouter.get('/',_controller_customer_controller_js__WEBPACK_IMPORTED_MODULE_1__.getAllCustomers);\r\nrouter.get('/:id',_controller_customer_controller_js__WEBPACK_IMPORTED_MODULE_1__.getCustomer);\r\nrouter.post('/',_controller_customer_controller_js__WEBPACK_IMPORTED_MODULE_1__.addCustomer);\r\nrouter.delete('/:id',_controller_customer_controller_js__WEBPACK_IMPORTED_MODULE_1__.deleteCustomer);\r\nrouter.put('/:id',_controller_customer_controller_js__WEBPACK_IMPORTED_MODULE_1__.updateCustomer);\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://back-end-nodejs/./routes/customer/customer.router.js?");

/***/ }),

/***/ "./routes/index.router.js":
/*!********************************!*\
  !*** ./routes/index.router.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n\r\nconst router = express__WEBPACK_IMPORTED_MODULE_0__.Router();\r\n\r\nrouter.get('/',(req,res)=>{\r\n    const resObject = {\r\n        state:'success',\r\n        message: 'Hello World!',\r\n    };\r\n    res.status(200).json(resObject);\r\n});\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://back-end-nodejs/./routes/index.router.js?");

/***/ }),

/***/ "./utils/handler.js":
/*!**************************!*\
  !*** ./utils/handler.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handleError: () => (/* binding */ handleError),\n/* harmony export */   handleResponse: () => (/* binding */ handleResponse)\n/* harmony export */ });\n/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! yup */ \"yup\");\n\r\n\r\nconst handleResponse = (res,statusCode, data) => {\r\n    return res.status(statusCode).json(data);\r\n};\r\n\r\nconst handleError = (res,error) => {\r\n    const statusCode = 400;\r\n    let errors = [];\r\n\r\n    if (error.name === 'CastError') {\r\n        errors.push({ message: 'Invalid ID format' });\r\n    } else if (error instanceof yup__WEBPACK_IMPORTED_MODULE_0__.ValidationError) {\r\n        errors = error.inner.map((error) => ({ message: error.errors[0] }));\r\n    } else if (error.name === 'ValidationError') {\r\n        errors = Object.keys(error.errors).map((field) => ({\r\n            message: error.errors[field].message,\r\n        }));\r\n    } else {\r\n        errors.push({ message: error.message });\r\n    }\r\n\r\n    return handleResponse(res, statusCode, { success: false, errors });\r\n};\r\n\n\n//# sourceURL=webpack://back-end-nodejs/./utils/handler.js?");

/***/ }),

/***/ "./utils/validateRequest.js":
/*!**********************************!*\
  !*** ./utils/validateRequest.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   validateCustomer: () => (/* binding */ validateCustomer)\n/* harmony export */ });\n/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! yup */ \"yup\");\n\r\n\r\nconst validateCustomer = async(customer) =>{\r\n    const customerSchema = (0,yup__WEBPACK_IMPORTED_MODULE_0__.object)({\r\n        name:(0,yup__WEBPACK_IMPORTED_MODULE_0__.string)().min(3).max(15).required('User name is required'),\r\n        email:(0,yup__WEBPACK_IMPORTED_MODULE_0__.string)().matches(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,\"Invalid email format. Please enter a valid email address.\").required('User email is required'),\r\n        phone:(0,yup__WEBPACK_IMPORTED_MODULE_0__.string)().length(10, 'Phone must be 10 numbers').required('User phone is required'),\r\n        country:(0,yup__WEBPACK_IMPORTED_MODULE_0__.string)().required('User country is required'),\r\n        isActive:(0,yup__WEBPACK_IMPORTED_MODULE_0__.boolean)(),\r\n    });\r\n\r\n    const result = await customerSchema.validate(customer,{abortEarly:false});\r\n};\r\n\r\n\n\n//# sourceURL=webpack://back-end-nodejs/./utils/validateRequest.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app.js");
/******/ 	
/******/ })()
;