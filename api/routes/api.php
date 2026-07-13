<?php

use App\Http\Controllers\ClientsController;
use App\Http\Controllers\RegionsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CotizacionController;
use App\Http\Controllers\AddressessController;
use App\Http\Controllers\ExcelController;
use App\Http\Controllers\ExporterController;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\PackagesController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\RoutesController;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Controllers\AttributesController;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\PropiedadesController;
use App\Http\Controllers\EstadosController;
use App\Http\Controllers\MunicipiosController;

Route::resource('/userss', UsersController::class);
Route::post('/userss/uploadimg',[UsersController::class, 'uploadImg']);
Route::post('/userss/updatepassword',[UsersController::class, 'updatePassword']);



Route::resource('/clients', ClientsController::class);
Route::resource('/regions', RegionsController::class);
//Route::resource('/packages', PackagesController::class);

Route::resource('/cotizacion', CotizacionController::class);
Route::resource('/excel', ExcelController::class);

Route::post('/excel/actions/upload',[ExcelController::class, 'upload']);


//RUTAS

Route::post('/routess/actions/get_data',[RoutesController::class, 'getReadyPackages']);
Route::post('/routess/actions/remove_from_route',[RoutesController::class, 'deleteFromRoute']);
Route::get('/routess/export/{id}',[ExporterController::class, 'exportRoute']);

//PAGOS
Route::post('/payments/actions/upload', [PaymentsController::class,'store']);
Route::post('/payments/actions/validate', [PaymentsController::class,'validatePay']);

Route::get('/payments/client/{id}', [PaymentsController::class,'showPaymentsUser']);


Route::resource('/attributes',AttributesController::class);

Route::resource('/propiedades', PropiedadesController::class);

Route::get('/estados', [EstadosController::class, 'index']);
Route::get('/estados/{id}/municipios', [EstadosController::class, 'municipios']);
Route::get('/municipios/{id}/colonias', [MunicipiosController::class, 'colonias']);


//AUTH
Route::post('/login',[AuthController::class, 'login']);
Route::post('/userdata',[AuthController::class, 'user']);
Route::post('/logout',[AuthController::class, 'logout']);
Route::post('/register',[AuthController::class, 'register']);
Route::get('/packagess/client/{id}', [PackagesController::class,'getPackagesByClient']);

Route::resource('/packagess', PackagesController::class);
Route::get('/packagess/actions/filter/{id}',[PackagesController::class, 'filterByStatus']);

Route::middleware('auth:api')->group(function () {
    Route::resource('/routess', RoutesController::class);
    Route::resource('/address', AddressessController::class);
    Route::post('/address/actions/predef',[AddressessController::class, 'predefAddress']);
});


Route::middleware([JwtMiddleware::class])->group(function () {
    Route::get('user', [AuthController::class, 'getUser']);
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::get('/cache',function(){
    Artisan::call('cache:clear');
    Artisan::call('route:clear');
    Artisan::call('config:clear');
});

Route::get('/pdf/{track_number}', [PdfController::class,'show']);