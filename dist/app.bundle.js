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

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("lodash");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   customerModel: () => (/* binding */ customerModel)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\r\n\r\n\r\nconst userSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\r\n    name:{\r\n        type:String,\r\n        minlength:3,\r\n        maxlength:15,\r\n        trim:true,\r\n        required:true\r\n    },\r\n    email:{\r\n        type:String,\r\n        required:true,\r\n        unique: true,\r\n        validate:{\r\n            validator:function(value){\r\n                return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);\r\n            },\r\n            message:\"Invalid email format. Please enter a valid email address.\"\r\n        },\r\n    },\r\n    phone:{\r\n        type:String,\r\n        required:true,\r\n        validate:{\r\n            validator:function(value){\r\n                return /^\\d{10}$/.test(value);\r\n            },\r\n            message: 'Phone must have exactly 10 digits',\r\n        }\r\n    },\r\n    country:{\r\n        type:String,\r\n        required:true\r\n    },\r\n    isActive:{\r\n        type:Boolean,\r\n        default:true\r\n    }\r\n});\r\n\r\nuserSchema.methods.generateAuthToken = function (){\r\n    const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__.sign({_id:this._id},process.env.CRUD_jwtPrivateKey,{ expiresIn: '8h' });\r\n    return token;\r\n};\r\n\r\nconst customerModel = (0,mongoose__WEBPACK_IMPORTED_MODULE_0__.model)('Customer',userSchema);\n\n//# sourceURL=webpack://back-end-nodejs/./DB/models/customer.model.js?");

/***/ }),

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv */ \"dotenv\");\n/* harmony import */ var _DB_connection_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DB/connection.js */ \"./DB/connection.js\");\n/* harmony import */ var _utils_createApp_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/createApp.js */ \"./utils/createApp.js\");\n\r\n\r\n\r\ndotenv__WEBPACK_IMPORTED_MODULE_0__.config();\r\n\r\nconst app = (0,_utils_createApp_js__WEBPACK_IMPORTED_MODULE_2__.createApp)();\r\n(0,_DB_connection_js__WEBPACK_IMPORTED_MODULE_1__.connectDB)();\r\n\r\nconst port = process.env.PORT || 3000;\r\napp.listen(port,()=>console.log(`Listening at port ${port}...`));\r\n\r\n\n\n//# sourceURL=webpack://back-end-nodejs/./app.js?");

/***/ }),

/***/ "./controllers/customer.controller.js":
/*!********************************************!*\
  !*** ./controllers/customer.controller.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addCustomer: () => (/* binding */ addCustomer),\n/* harmony export */   deleteCustomer: () => (/* binding */ deleteCustomer),\n/* harmony export */   getAllCustomers: () => (/* binding */ getAllCustomers),\n/* harmony export */   getCustomer: () => (/* binding */ getCustomer),\n/* harmony export */   updateCustomer: () => (/* binding */ updateCustomer)\n/* harmony export */ });\n/* harmony import */ var _DB_models_customer_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DB/models/customer.model.js */ \"./DB/models/customer.model.js\");\n/* harmony import */ var _utils_customError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/customError.js */ \"./utils/customError.js\");\n/* harmony import */ var _middleware_handler_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middleware/handler.js */ \"./middleware/handler.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ \"lodash\");\n\r\n\r\n\r\n\r\n\r\nconst getAllCustomers = async(req,res)=>{\r\n    const customers = await _DB_models_customer_model_js__WEBPACK_IMPORTED_MODULE_0__.customerModel.find();\r\n    return (0,_middleware_handler_js__WEBPACK_IMPORTED_MODULE_2__.handleResponse)(res,200,{ success: true,customers })\r\n};\r\n\r\nconst getCustomer = async(req,res)=>{\r\n    const {id} = req.params;\r\n    const customer = await _DB_models_customer_model_js__WEBPACK_IMPORTED_MODULE_0__.customerModel.findById(id);\r\n    if(!customer)\r\n        throw new _utils_customError_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Invalid ID',404);\r\n    return (0,_middleware_handler_js__WEBPACK_IMPORTED_MODULE_2__.handleResponse)(res,200,{ success: true,customer });\r\n};\r\n\r\nconst addCustomer = async(req,res)=>{\r\n    let customer = await _DB_models_customer_model_js__WEBPACK_IMPORTED_MODULE_0__.customerModel.findOne({email:req.body.email});\r\n    if(customer) throw new _utils_customError_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('The user is already registered.',400);\r\n\r\n    customer = new _DB_models_customer_model_js__WEBPACK_IMPORTED_MODULE_0__.customerModel(lodash__WEBPACK_IMPORTED_MODULE_3__.pick(req.body,['name','email','phone','country','isActive']));\r\n    await customer.save();\r\n\r\n    const token = customer.generateAuthToken();\r\n    return (0,_middleware_handler_js__WEBPACK_IMPORTED_MODULE_2__.handleResponse)(res,200,{success:true, customer},token);\r\n};\r\n\r\nconst updateCustomer = async(req,res)=>{ \r\n    const {id} = req.params;\r\n\r\n    const customer = await _DB_models_customer_model_js__WEBPACK_IMPORTED_MODULE_0__.customerModel.findByIdAndUpdate({_id:id},\r\n        lodash__WEBPACK_IMPORTED_MODULE_3__.pick(req.body,['name','email','phone','country','isActive']),{new:true});\r\n    \r\n    if(!customer) throw new _utils_customError_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Invalid ID',404);\r\n    return (0,_middleware_handler_js__WEBPACK_IMPORTED_MODULE_2__.handleResponse)(res,200,{ success: true, customer });\r\n};\r\n\r\nconst deleteCustomer = async(req,res)=>{\r\n    const {id} = req.params;\r\n    const customer = await _DB_models_customer_model_js__WEBPACK_IMPORTED_MODULE_0__.customerModel.findByIdAndDelete(id);\r\n    if(!customer) throw new _utils_customError_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Invalid ID',404);\r\n    return (0,_middleware_handler_js__WEBPACK_IMPORTED_MODULE_2__.handleResponse)(res,200,{ success: true,id});\r\n};\r\n\n\n//# sourceURL=webpack://back-end-nodejs/./controllers/customer.controller.js?");

/***/ }),

/***/ "./middleware/async.js":
/*!*****************************!*\
  !*** ./middleware/async.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   asyncMiddleware: () => (/* binding */ asyncMiddleware)\n/* harmony export */ });\n/* harmony import */ var _handler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handler.js */ \"./middleware/handler.js\");\n\r\n\r\nconst asyncMiddleware = (handler)=>{\r\n    return async(req,res,next)=>{\r\n        try{\r\n            await handler(req,res);\r\n        }catch(err){\r\n            (0,_handler_js__WEBPACK_IMPORTED_MODULE_0__.handleError)(err,req,res,next);\r\n        }\r\n    }\r\n};\n\n//# sourceURL=webpack://back-end-nodejs/./middleware/async.js?");

/***/ }),

/***/ "./middleware/auth.js":
/*!****************************!*\
  !*** ./middleware/auth.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   auth: () => (/* binding */ auth)\n/* harmony export */ });\n/* harmony import */ var _utils_customError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/customError.js */ \"./utils/customError.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\r\n\r\n\r\nconst auth =(req,res,next)=>{\r\n    try{\r\n        const token = req.header('x-auth-token');\r\n        if(!token) throw new _utils_customError_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Access denied. No token provided.',401);\r\n        const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__.verify(token,process.env.CRUD_jwtPrivateKey);\r\n        req.user = decoded;\r\n        next();\r\n    }catch(err)\r\n    {\r\n        next(err);\r\n    }\r\n};\n\n//# sourceURL=webpack://back-end-nodejs/./middleware/auth.js?");

/***/ }),

/***/ "./middleware/handler.js":
/*!*******************************!*\
  !*** ./middleware/handler.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handleError: () => (/* binding */ handleError),\n/* harmony export */   handleResponse: () => (/* binding */ handleResponse)\n/* harmony export */ });\n/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! yup */ \"yup\");\n/* harmony import */ var _utils_customError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/customError.js */ \"./utils/customError.js\");\n\r\n\r\n\r\nconst handleResponse = (res,statusCode, data,token=null) => {\r\n    if(!token) return res.status(statusCode).json(data);\r\n    return res.header('x-auth-token',token).status(statusCode).json(data);\r\n};\r\n\r\nconst handleError = (err,req,res,next) => {\r\n    let statusCode = 500;\r\n    let errors = [];\r\n    if (err instanceof _utils_customError_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\r\n        errors.push(err.message );\r\n        statusCode = err.statusCode;\r\n    }else if (err instanceof yup__WEBPACK_IMPORTED_MODULE_0__.ValidationError) {\r\n        errors = err.inner.map((error) => (error.errors[0]));\r\n        statusCode = 400;\r\n    } else if (err.name === 'ValidationError') {\r\n        errors = Object.keys(err.errors).map((field) => (err.errors[field].message));\r\n        statusCode = 400;\r\n    }\r\n    else errors.push('Something went wrong!');\r\n    return handleResponse(res, statusCode, { success: false,errors });\r\n};\r\n\n\n//# sourceURL=webpack://back-end-nodejs/./middleware/handler.js?");

/***/ }),

/***/ "./middleware/validate.js":
/*!********************************!*\
  !*** ./middleware/validate.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   validate: () => (/* binding */ validate)\n/* harmony export */ });\nconst validate = (validator) =>{\r\n    return async (req,res,next) => {\r\n        try{\r\n            await validator.validate(req.body, { abortEarly: false });\r\n            next();\r\n        }catch(err){\r\n            next(err);\r\n        }\r\n    }\r\n};\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://back-end-nodejs/./middleware/validate.js?");

/***/ }),

/***/ "./middleware/validateObjectId.js":
/*!****************************************!*\
  !*** ./middleware/validateObjectId.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   validateObjectId: () => (/* binding */ validateObjectId)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var _utils_customError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/customError.js */ \"./utils/customError.js\");\n\r\n\r\n\r\nconst validateObjectId = (req, res, next) => {\r\n    if (!mongoose__WEBPACK_IMPORTED_MODULE_0__.Types.ObjectId.isValid(req.params.id)) {\r\n        return next(new _utils_customError_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Invalid ID.', 404)); \r\n    }\r\n    next();\r\n};\r\n\n\n//# sourceURL=webpack://back-end-nodejs/./middleware/validateObjectId.js?");

/***/ }),

/***/ "./routes/customer.router.js":
/*!***********************************!*\
  !*** ./routes/customer.router.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var _controllers_customer_controller_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/customer.controller.js */ \"./controllers/customer.controller.js\");\n/* harmony import */ var _middleware_async_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middleware/async.js */ \"./middleware/async.js\");\n/* harmony import */ var _middleware_validateObjectId_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../middleware/validateObjectId.js */ \"./middleware/validateObjectId.js\");\n/* harmony import */ var _middleware_validate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../middleware/validate.js */ \"./middleware/validate.js\");\n/* harmony import */ var _utils_validateCustomer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/validateCustomer.js */ \"./utils/validateCustomer.js\");\n/* harmony import */ var _middleware_auth_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../middleware/auth.js */ \"./middleware/auth.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst router = express__WEBPACK_IMPORTED_MODULE_0__.Router();\r\n\r\nrouter.get('/',(0,_middleware_async_js__WEBPACK_IMPORTED_MODULE_2__.asyncMiddleware)(_controllers_customer_controller_js__WEBPACK_IMPORTED_MODULE_1__.getAllCustomers));\r\nrouter.get('/:id',_middleware_validateObjectId_js__WEBPACK_IMPORTED_MODULE_3__.validateObjectId,(0,_middleware_async_js__WEBPACK_IMPORTED_MODULE_2__.asyncMiddleware)(_controllers_customer_controller_js__WEBPACK_IMPORTED_MODULE_1__.getCustomer));\r\nrouter.post('/',(0,_middleware_validate_js__WEBPACK_IMPORTED_MODULE_4__.validate)(_utils_validateCustomer_js__WEBPACK_IMPORTED_MODULE_5__.customerSchema),(0,_middleware_async_js__WEBPACK_IMPORTED_MODULE_2__.asyncMiddleware)(_controllers_customer_controller_js__WEBPACK_IMPORTED_MODULE_1__.addCustomer));\r\nrouter.put('/:id',[_middleware_auth_js__WEBPACK_IMPORTED_MODULE_6__.auth,_middleware_validateObjectId_js__WEBPACK_IMPORTED_MODULE_3__.validateObjectId,(0,_middleware_validate_js__WEBPACK_IMPORTED_MODULE_4__.validate)(_utils_validateCustomer_js__WEBPACK_IMPORTED_MODULE_5__.customerSchema)],(0,_middleware_async_js__WEBPACK_IMPORTED_MODULE_2__.asyncMiddleware)(_controllers_customer_controller_js__WEBPACK_IMPORTED_MODULE_1__.updateCustomer));\r\nrouter.delete('/:id',[_middleware_auth_js__WEBPACK_IMPORTED_MODULE_6__.auth,_middleware_validateObjectId_js__WEBPACK_IMPORTED_MODULE_3__.validateObjectId],(0,_middleware_async_js__WEBPACK_IMPORTED_MODULE_2__.asyncMiddleware)(_controllers_customer_controller_js__WEBPACK_IMPORTED_MODULE_1__.deleteCustomer));\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://back-end-nodejs/./routes/customer.router.js?");

/***/ }),

/***/ "./routes/index.router.js":
/*!********************************!*\
  !*** ./routes/index.router.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n\r\nconst router = express__WEBPACK_IMPORTED_MODULE_0__.Router();\r\n\r\nrouter.get('/',(req,res)=>{\r\n    const resObject = {\r\n        state:'success',\r\n        message: 'Hello World!',\r\n    };\r\n    res.status(200).json(resObject);\r\n});\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://back-end-nodejs/./routes/index.router.js?");

/***/ }),

/***/ "./utils/createApp.js":
/*!****************************!*\
  !*** ./utils/createApp.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createApp: () => (/* binding */ createApp)\n/* harmony export */ });\n/* harmony import */ var _routes_index_router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../routes/index.router.js */ \"./routes/index.router.js\");\n/* harmony import */ var _routes_customer_router_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../routes/customer.router.js */ \"./routes/customer.router.js\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var _middleware_handler_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../middleware/handler.js */ \"./middleware/handler.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst createApp = () => {\r\n    const app = express__WEBPACK_IMPORTED_MODULE_2__();\r\n    app.use(cors__WEBPACK_IMPORTED_MODULE_3__());\r\n    app.use(express__WEBPACK_IMPORTED_MODULE_2__.json());\r\n    app.use('/', _routes_index_router_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\r\n    app.use('/api/customer', _routes_customer_router_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\r\n    app.use('*', (req, res) => {\r\n        res.status(404).json('Page not found');\r\n    });\r\n    app.use(_middleware_handler_js__WEBPACK_IMPORTED_MODULE_4__.handleError);\r\n    return app;\r\n};\n\n//# sourceURL=webpack://back-end-nodejs/./utils/createApp.js?");

/***/ }),

/***/ "./utils/customError.js":
/*!******************************!*\
  !*** ./utils/customError.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CustomError)\n/* harmony export */ });\nclass CustomError extends Error{\r\n    constructor(message,statusCode)\r\n    {\r\n        super(message);\r\n        this.statusCode = statusCode;\r\n    }\r\n}\n\n//# sourceURL=webpack://back-end-nodejs/./utils/customError.js?");

/***/ }),

/***/ "./utils/validateCustomer.js":
/*!***********************************!*\
  !*** ./utils/validateCustomer.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   customerSchema: () => (/* binding */ customerSchema)\n/* harmony export */ });\n/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! yup */ \"yup\");\n\r\n\r\nconst customerSchema = (0,yup__WEBPACK_IMPORTED_MODULE_0__.object)({\r\n    name:(0,yup__WEBPACK_IMPORTED_MODULE_0__.string)().min(3).max(15).required('User name is required'),\r\n    email:(0,yup__WEBPACK_IMPORTED_MODULE_0__.string)().matches(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,\"Invalid email format. Please enter a valid email address.\").required('User email is required'),\r\n    phone:(0,yup__WEBPACK_IMPORTED_MODULE_0__.string)().length(10, 'Phone must be 10 numbers').required('User phone is required'),\r\n    country:(0,yup__WEBPACK_IMPORTED_MODULE_0__.string)().required('User country is required'),\r\n    isActive:(0,yup__WEBPACK_IMPORTED_MODULE_0__.boolean)(),\r\n}).unknown();\r\n\n\n//# sourceURL=webpack://back-end-nodejs/./utils/validateCustomer.js?");

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