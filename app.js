var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var oracledb = require('oracledb');
oracledb.maxRows = 10000;
var fs = require('fs');
var dirTree = require('directory-tree');
var async = require("async");

var connAttrs_HPO = {
    user: "OPC_REPORT",
    password: "OlP32xaB4z",
    connectString: "(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = 189.125.185.171)(PORT = 1521))(CONNECT_DATA = (SERVER = DEDICATED)(SERVICE_NAME = HPOMD)))"
}
var connAttrs_HPR = {
    user: "OPENVIEW",
    password: "openview",
    connectString: "(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = 189.125.185.171)(PORT = 1521))(CONNECT_DATA = (SERVER = DEDICATED)(SERVICE_NAME = HPRDB03)))"
}


//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static('public'));
app.use('/app/reports', express.static('/app/reports'));
app.use('/doc', express.static(path.join(__dirname, 'doc')));
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//app.use('/', routes);
//app.use('/users', users);

//app.param(['id', 'node', 'days', 'date1','date2'], function(req, res, next, values) {
//        console.log(req.id);
//    next();
//});
//

/*

app.get('/Dashboard/:id', function(req, res) {
    var id = req.params.id;
    res.render('pages/index', {
        id: req.params.id
    });
    return;
});

app.get('/metrics/:node', function(req, res) {
    var id = req.params.id;
    res.render('pages/metrics', {
        node: req.params.node
    });
    return;
});

// ABM Arbol de servicios
app.get('/tree/:id', function(req, res) {
    var id = req.params.id;
    res.render('pages/tree', {
        id: req.params.node
    });
    return;
});





*/
// RESTFUL API que devuelve los mensajes por nodo y aplicacion
/**
 * @api {get} /GetTotCustMessages/:id Messages totals for a customer
 * @apiName GetTotCustMessages
 * @apiGroup Messages
 * @apiSampleRequest http://10.10.7.93:8000/GetTotCustMessages/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} APPLICATION Name of the application being monitored and affected
 * @apiSuccess {String} SYSTEMID Name of the system impacted by alarm
 * @apiSuccess {String:Numer} CRITICAL:n Total number of critical alarmas
 * @apiSuccess {String:Numer} MAJOR:n Total number of major alarmas
 * @apiSuccess {String:Numer} MINOR:n Total number of minor alarmas
 * @apiSuccessExample Example data on success
 *[
    {
        "APPLICATION": "Linux",
        "SYSTEMID": "bue-lx-ps1.bunge.ar",
        "CRITICAL": null,
        "MAJOR": 1,
        "MINOR": null
    },
    {
        "APPLICATION": "Oracle",
        "SYSTEMID": "bue-lx-pbw.bunge.ar",
        "CRITICAL": 1,
        "MAJOR": null,
        "MINOR": null
    }]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */

app.get('/GetTotCustMessages/:id', function(req, res) {
    "use strict";
    var id = req.params.id;
    fs.readFile("msg_total_customer.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPO, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /messages" + req.params.id + " : Connection released");
                            }
                        });
                });
        });

    });

});


// RESTFUL API que devuelve la lista de clientes de CTL
/**
 * @api {get} /GetCustomerList Customer list
 * @apiName GetCustomerList
 * @apiGroup Customers
 * @apiSampleRequest http://10.10.7.93:8000/GetCustomerList
 * @apiVersion 0.1.0
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SIEBELID SiebelId of the customer
 * @apiSuccess {String} NAME Customer name
 * @apiSuccessExample Example data on success
 *[
  {
    "SIEBELID": "1-CNK1",
    "NAME": "Bunge"
  }]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetCustomerList', function(req, res) {
    "use strict";
    var id = req.params.id;
    fs.readFile("customer_list.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPO, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /messages : Connection released");
                            }
                        });
                });
        });

    });

});






// RESTFUL API que devuelve el estado de cada nodo de un cliente 
/**
 * @api {get} /GetNodesByStatus/:id Nodes by status for a customer
 * @apiName GetNodesByStatus
 * @apiGroup Status
 * @apiSampleRequest http://10.10.7.93:8000/GetNodesByStatus/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Name of the system impacted by alarm
 * @apiSuccess {String} STATUS Status of the node
 * @apiSuccessExample Example data on success
 *[
  {
    "SYSTEMID": "bue-lx-de3.bunge.ar",
    "STATUS": "NORMAL"
  },
  {
    "SYSTEMID": "bue-lx-dgr.bunge.ar",
    "STATUS": "NORMAL"
  },
  {
    "SYSTEMID": "bue-lx-qgr.bunge.ar",
    "STATUS": "NORMAL"
  },
  {
    "SYSTEMID": "bue-lx-pwd.bunge.ar",
    "STATUS": "NORMAL"
  },
  {
    "SYSTEMID": "bue-lx-qa2.bunge.ar",
    "STATUS": "NORMAL"
  },
  {
    "SYSTEMID": "bue-lx-qwd.bunge.ar",
    "STATUS": "NORMAL"
  },
  {
    "SYSTEMID": "bue-lx-dbw.bunge.ar",
    "STATUS": "CRITICAL"
  },
  {
    "SYSTEMID": "bue-lx-pgr.bunge.ar",
    "STATUS": "NORMAL"
  },
  {
    "SYSTEMID": "bue-lx-ps1.bunge.ar",
    "STATUS": "NORMAL"
  },
  {
    "SYSTEMID": "bue-lx-prd1n.bunge.ar",
    "STATUS": "MAJOR"
  },
  {
    "SYSTEMID": "bue-lx-qa6.bunge.ar",
    "STATUS": "MINOR"
  },
  {
    "SYSTEMID": "bue-212-pep.bunge.ar",
    "STATUS": "NORMAL"
  }
  ]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */

app.get('/GetNodesByStatus/:id', function(req, res) {
    "use strict";
    var id = req.params.id;
    fs.readFile("nodes_by_status.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPO, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /messages" + req.params.id + " : Connection released");
                            }
                        });
                });
        });

    });

});


// RESTFUL API que devuelve el detalle de mensajes por nodo
/**
 * @api {get} /GetDetailNodeMessages/:id Detail messages for a node
 * @apiName GetDetailNodeMessages
 * @apiGroup Messages
 * @apiSampleRequest http://10.10.7.93:8000/GetDetailNodeMessages/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Full hostname of the node
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {Number} DUPLICATES Number of duplicated alarms
 * @apiSuccess {Datetime} DATETIME Alarm receiving time
 * @apiSuccess {String} SEVERITY Alarm severity
 * @apiSuccess {String} MESSAGE_GROUP Workgroup attending alarm
 * @apiSuccess {String} APPLICATION Name of the application being monitored and affected
 * @apiSuccess {String} OBJECT Object with issue
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {String} MESSAGE_TEXT Text of the alarm
 * @apiSuccess {String} TICKET Reference ticket
 * @apiSuccessExample Example data on success
 *[
    {
        "DUPLICATES": "87",
        "DATETIME": "01/28/17 20:06:06",
        "SEVERITY": "major",
        "MESSAGE_GROUP": "SAP",
        "OBJECT": "PRD 00",
        "SYSTEMID": "bue-lx-prd1n.bunge.ar",
        "MESSAGE_TEXT": "! - 40 update errors occurred on host bue-lx-prd1n; sid:PRD."
        "TICKET": "SM-00012343"
    },
    {
        "DUPLICATES": "176",
        "DATETIME": "01/28/17 19:30:08",
        "SEVERITY": "major",
        "MESSAGE_GROUP": "SAP",
        "OBJECT": "PRD 00",
        "SYSTEMID": "bue-lx-prd1n.bunge.ar",
        "MESSAGE_TEXT": "! - Number of spool requests entries: 30307 ; Configured threshold is: 20000.",
        "TICKET": "SM-00012343"
    }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetDetailNodeMessages/:id', function(req, res) {
    "use strict";
    var id = req.params.id;
    fs.readFile("msg_detail_node.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPO, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /messages" + req.params.id + " : Connection released");
                            }
                        });
                });
        });

    });

});



// RESTFUL API que devuelve el detalle de mensajes por cliente
/**
 * @api {get} /GetDetailCustMessages/:id Detail messages for a customer
 * @apiName GetDetailCustMessages
 * @apiGroup Messages
 * @apiSampleRequest http://10.10.7.93:8000/GetDetailCustMessages/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {Number} DUPLICATES Number of duplicated alarms
 * @apiSuccess {Datetime} DATETIME Alarm receiving time
 * @apiSuccess {String} SEVERITY Alarm severity
 * @apiSuccess {String} MESSAGE_GROUP Workgroup attending alarm
 * @apiSuccess {String} APPLICATION Name of the application being monitored and affected
 * @apiSuccess {String} OBJECT Object with issue
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {String} MESSAGE_TEXT Text of the alarm
 * @apiSuccess {String} TICKET Reference ticket
 * @apiSuccessExample Example data on success
 *[
    {
        "DUPLICATES": "87",
        "DATETIME": "01/28/17 20:06:06",
        "SEVERITY": "major",
        "MESSAGE_GROUP": "SAP",
        "APPLICATION": "SAP",
        "OBJECT": "PRD 00",
        "SYSTEMID": "bue-lx-prd1n.bunge.ar",
        "MESSAGE_TEXT": "! - 40 update errors occurred on host bue-lx-prd1n; sid:PRD.",
        "TICKET": "SM-00012343"
    },
    {
        "DUPLICATES": "176",
        "DATETIME": "01/28/17 19:30:08",
        "SEVERITY": "major",
        "MESSAGE_GROUP": "SAP",
        "APPLICATION": "SAP",
        "OBJECT": "PRD 00",
        "SYSTEMID": "bue-lx-prd1n.bunge.ar",
        "MESSAGE_TEXT": "! - Number of spool requests entries: 30307 ; Configured threshold is: 20000.",
        "TICKET": "SM-00012343"
    }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetDetailCustMessages/:id', function(req, res) {
    "use strict";
    var id = req.params.id;
    fs.readFile("msg_detail_cust.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPO, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /messages" + req.params.id + " : Connection released");
                            }
                        });
                });
        });

    });

});


// RESTFUL API que devuelve los nodos monitoreados del cliente
/**
 * @api {get} /GetCustNodes/:id Customer monitored node list
 * @apiName GetCustNodes
 * @apiGroup Nodes
 * @apiSampleRequest http://10.10.7.93:8000/GetCustNodes/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccessExample Example data on success
 *[
    {
        "SYSTEMID": "bue-lx-ps1.bunge.ar"
    },
    {
        "SYSTEMID": "bue-lx-dev.bunge.ar"
    },
    {
        "SYSTEMID": "bue-212-ptx.bunge.ar"
    }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */

app.get('/GetCustNodes/:id', function(req, res) {
    "use strict";
    var id = req.params.id;
    fs.readFile("cust_nodes.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPO, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GestCustNodes" + req.params.id + " : Connection released");
                            }
                        });
                });
        });

    });

});


// RESTFUL API que devuelve el cliente y el pais de un nodo
/**
 * @api {get} /GetNodeCustCountry/:id Node's country and siebel id
 * @apiName GetNodeCustomerCountry
 * @apiGroup Nodes
 * @apiSampleRequest http://10.10.7.93:8000/GetNodeCustCountry/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Node name
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SIEBELID Customer Siebel ID
 * @apiSuccess {String} COUNTRY Node country
 * @apiSuccessExample Example data on success
 * [
 * {
 * "SYSTEMID":"gbpsap.globant.ar",
 * "SIEBELID":"1-3I6KN3",
 * "COUNTRY":"Argentina"}
 * ]
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */

app.get('/GetNodeCustCountry/:id', function(req, res) {
    "use strict";
    var id = req.params.id;
    fs.readFile("node_cust_country.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPO, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetNodeCustCountry" + req.params.id + " : Connection released");
                            }
                        });
                });
        });

    });

});





// RESTFUL API que devuelve los nodos con mayor uso de CPU en la semana completa anterior
/**
 * @api {get} /GetTopCpuNodesLastWeek/:id Top 10 customer cpu comsumers for the last week
 * @apiName GetTopCpuNodesLastWeek
 * @apiGroup Performance CPU
 * @apiSampleRequest http://10.10.7.93:8000/GetTopCpuNodesLastWeek/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {Number} GBL_CPU_TOTAL_UTIL Cpu utilization percent
 * @apiSuccessExample Example data on success
 *[
  {
    "SYSTEMID": "bue-212-pbo.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 60.59
  },
  {
    "SYSTEMID": "bue-lx-dpi.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 60.25
  },
  {
    "SYSTEMID": "bue-lx-qas.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 58.35
  },
  {
    "SYSTEMID": "bue-lx-pbw.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 55.79
  },
  {
    "SYSTEMID": "bue-212-dbo.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 49.46
  },
  {
    "SYSTEMID": "bue-212-qbo.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 47.230000000000004
  },
  {
    "SYSTEMID": "bue-lx-qas1.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 44.17
  },
  {
    "SYSTEMID": "bue-lx-ps1.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 39.92
  },
  {
    "SYSTEMID": "bue-lx-prd4n.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 35.46
  },
  {
    "SYSTEMID": "bue-lx-prd3n.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 35.25
  }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetTopCpuNodesLastWeek/:id', function(req, res) {
    "use strict";
    var id = req.params.id;
    fs.readFile("top_cpu_util_nodes_last_week.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetTopCpuNodesLastWeek" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});


// RESTFUL API que devuelve los nodos con mayor uso de CPU en el mes anterior
/**
 * @api {get} /GetTopCpuNodesLastMonth/:id Top 10 customer cpu comsumers for the last month
 * @apiName GetTopCpuNodesLastMonth
 * @apiGroup Performance CPU
 * @apiSampleRequest http://10.10.7.93:8000/GetTopCpuNodesLastMonth/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {Number} GBL_CPU_TOTAL_UTIL Cpu utilization percent
 * @apiSuccessExample Example data on success
 *[
  {
    "SYSTEMID": "bue-212-pbo.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 60.59
  },
  {
    "SYSTEMID": "bue-lx-dpi.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 60.25
  },
  {
    "SYSTEMID": "bue-lx-qas.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 58.35
  },
  {
    "SYSTEMID": "bue-lx-pbw.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 55.79
  },
  {
    "SYSTEMID": "bue-212-dbo.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 49.46
  },
  {
    "SYSTEMID": "bue-212-qbo.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 47.230000000000004
  },
  {
    "SYSTEMID": "bue-lx-qas1.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 44.17
  },
  {
    "SYSTEMID": "bue-lx-ps1.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 39.92
  },
  {
    "SYSTEMID": "bue-lx-prd4n.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 35.46
  },
  {
    "SYSTEMID": "bue-lx-prd3n.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 35.25
  }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetTopCpuNodesLastMonth/:id', function(req, res) {
    "use strict";
    var id = req.params.id;
    fs.readFile("top_cpu_util_nodes_last_month.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetTopCpuNodesLastMonth" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});



// RESTFUL API que devuelve los nodos con mayor uso de CPU en el día anterior
/**
 * @api {get} /GetTopCpuNodesYesterday/:id Top 10 customer cpu comsumers for past day
 * @apiName GetTopCpuNodesYesterday
 * @apiGroup Performance CPU
 * @apiSampleRequest http://10.10.7.93:8000/GetTopCpuNodesYesterday/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {Number} GBL_CPU_TOTAL_UTIL Cpu utilization percent
 * @apiSuccessExample Example data on success
 *[
  {
    "SYSTEMID": "bue-212-pbo.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 60.59
  },
  {
    "SYSTEMID": "bue-lx-dpi.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 60.25
  },
  {
    "SYSTEMID": "bue-lx-qas.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 58.35
  },
  {
    "SYSTEMID": "bue-lx-pbw.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 55.79
  },
  {
    "SYSTEMID": "bue-212-dbo.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 49.46
  },
  {
    "SYSTEMID": "bue-212-qbo.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 47.230000000000004
  },
  {
    "SYSTEMID": "bue-lx-qas1.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 44.17
  },
  {
    "SYSTEMID": "bue-lx-ps1.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 39.92
  },
  {
    "SYSTEMID": "bue-lx-prd4n.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 35.46
  },
  {
    "SYSTEMID": "bue-lx-prd3n.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 35.25
  }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetTopCpuNodesYesterday/:id', function(req, res) {
    "use strict";
    var id = req.params.id;
    fs.readFile("top_cpu_util_nodes_yesterday.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetTopCpuNodesYesterday" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});



// RESTFUL API que devuelve los nodos con mayor uso de CPU
/**
 * @api {get} /GetTopCpuNodes/:id/:days Top 10 customer cpu comsumers for the last n days
 * @apiName GetTopCpuNodes
 * @apiGroup Performance CPU
 * @apiSampleRequest http://10.10.7.93:8000/GetTopCpuNodes/:id/:days
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiParam {Number} days of days backwards to take for the measure
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {Number} GBL_CPU_TOTAL_UTIL Cpu utilization percent
 * @apiSuccessExample Example data on success
 *[
  {
    "SYSTEMID": "bue-212-pbo.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 60.59
  },
  {
    "SYSTEMID": "bue-lx-dpi.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 60.25
  },
  {
    "SYSTEMID": "bue-lx-qas.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 58.35
  },
  {
    "SYSTEMID": "bue-lx-pbw.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 55.79
  },
  {
    "SYSTEMID": "bue-212-dbo.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 49.46
  },
  {
    "SYSTEMID": "bue-212-qbo.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 47.230000000000004
  },
  {
    "SYSTEMID": "bue-lx-qas1.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 44.17
  },
  {
    "SYSTEMID": "bue-lx-ps1.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 39.92
  },
  {
    "SYSTEMID": "bue-lx-prd4n.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 35.46
  },
  {
    "SYSTEMID": "bue-lx-prd3n.bunge.ar",
    "GBL_CPU_TOTAL_UTIL": 35.25
  }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetTopCpuNodes/:id/:days', function(req, res) {
    "use strict";
    var id = req.params.id;
    var days = req.params.days;
    fs.readFile("top_cpu_util_nodes.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id, days], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetTopCpuNodes" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});



// RESTFUL API que devuelve los nodos con mayor memory pageout rate
/**
 * @api {get} /GetTopMemPageoutNodes/:id/:days Top 10 customer mem pageout rate comsumers for the last n days
 * @apiName GetTopMemPageoutNodes
 * @apiGroup Performance Mem Pageout Rate
 * @apiSampleRequest http://10.10.7.93:8000/GetTopMemPageoutNodes/:id/:days
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiParam {Number} days of days backwards to take for the measure
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {Number} GBL_MEM_PAGEOUT_RATE Mem pageout rate
 * @apiSuccessExample Example data on success
 *
 [
  {
    "SYSTEMID": "bue-lx-pbw.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 90.866666666667
  },
  {
    "SYSTEMID": "bue-lx-ppi.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 13.19705882352941
  },
  {
    "SYSTEMID": "bue-212-ptx.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 5.3
  },
  {
    "SYSTEMID": "bue-212-pbo.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 4.62727272727273
  },
  {
    "SYSTEMID": "bue-212-dep.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 4.50571428571429
  },
  {
    "SYSTEMID": "bue-212-pep.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 4.34
  },
  {
    "SYSTEMID": "bue-212-qbo.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 3.484375
  },
  {
    "SYSTEMID": "bue-212-dbo.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 3.4214285714285695
  },
  {
    "SYSTEMID": "bue-lx-ps1.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 3.3714285714285697
  },
  {
    "SYSTEMID": "bue-lx-dev.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 1.3090909090909097
  }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetTopMemPageoutNodes/:id/:days', function(req, res) {
    "use strict";
    var id = req.params.id;
    var days = req.params.days;
    fs.readFile("top_mem_pageout_nodes.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id, days], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetTopMemPageoutNodes" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});



// RESTFUL API que devuelve los nodos con mayor memory pageout rate del ultimo mes
/**
 * @api {get} /GetTopMemPageoutNodesLastMonth/:id Top 10 customer mem pageout rate comsumers for last month
 * @apiName GetTopMemPageoutNodesLastMonth
 * @apiGroup Performance Mem Pageout Rate
 * @apiSampleRequest http://10.10.7.93:8000/GetTopMemPageoutNodesLastMonth/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {Number} GBL_MEM_PAGEOUT_RATE Mem pageout rate
 * @apiSuccessExample Example data on success
 *
 [
  {
    "SYSTEMID": "bue-lx-pbw.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 90.866666666667
  },
  {
    "SYSTEMID": "bue-lx-ppi.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 13.19705882352941
  },
  {
    "SYSTEMID": "bue-212-ptx.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 5.3
  },
  {
    "SYSTEMID": "bue-212-pbo.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 4.62727272727273
  },
  {
    "SYSTEMID": "bue-212-dep.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 4.50571428571429
  },
  {
    "SYSTEMID": "bue-212-pep.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 4.34
  },
  {
    "SYSTEMID": "bue-212-qbo.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 3.484375
  },
  {
    "SYSTEMID": "bue-212-dbo.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 3.4214285714285695
  },
  {
    "SYSTEMID": "bue-lx-ps1.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 3.3714285714285697
  },
  {
    "SYSTEMID": "bue-lx-dev.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 1.3090909090909097
  }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetTopMemPageoutNodesLastMonth/:id', function(req, res) {
    "use strict";
    var id = req.params.id;

    fs.readFile("top_mem_pageout_nodes_last_month.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetTopMemPageoutNodesLastMonth" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});


// RESTFUL API que devuelve los nodos con mayor memory pageout rate de la ultima semana
/**
 * @api {get} /GetTopMemPageoutNodesLastWeek/:id Top 10 customer mem pageout rate comsumers for the last week
 * @apiName GetTopMemPageoutNodesLastWeek
 * @apiGroup Performance Mem Pageout Rate
 * @apiSampleRequest http://10.10.7.93:8000/GetTopMemPageoutNodesLastWeek/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {Number} GBL_MEM_PAGEOUT_RATE Mem pageout rate
 * @apiSuccessExample Example data on success
 *
 [
  {
    "SYSTEMID": "bue-lx-pbw.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 90.866666666667
  },
  {
    "SYSTEMID": "bue-lx-ppi.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 13.19705882352941
  },
  {
    "SYSTEMID": "bue-212-ptx.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 5.3
  },
  {
    "SYSTEMID": "bue-212-pbo.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 4.62727272727273
  },
  {
    "SYSTEMID": "bue-212-dep.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 4.50571428571429
  },
  {
    "SYSTEMID": "bue-212-pep.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 4.34
  },
  {
    "SYSTEMID": "bue-212-qbo.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 3.484375
  },
  {
    "SYSTEMID": "bue-212-dbo.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 3.4214285714285695
  },
  {
    "SYSTEMID": "bue-lx-ps1.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 3.3714285714285697
  },
  {
    "SYSTEMID": "bue-lx-dev.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 1.3090909090909097
  }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetTopMemPageoutNodesLastWeek/:id', function(req, res) {
    "use strict";
    var id = req.params.id;

    fs.readFile("top_mem_pageout_nodes_last_week.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetTopMemPageoutNodesLastWeek" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});

// RESTFUL API que devuelve los nodos con mayor memory pageout rate de ayer
/**
 * @api {get} /GetTopMemPageoutNodesLastWeek/:id Top 10 customer mem pageout rate comsumers for the past day
 * @apiName GetTopMemPageoutNodesYesterday
 * @apiGroup Performance Mem Pageout Rate
 * @apiSampleRequest http://10.10.7.93:8000/GetTopMemPageoutNodesYesterday/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {Number} GBL_MEM_PAGEOUT_RATE Mem pageout rate
 * @apiSuccessExample Example data on success
 *
 [
  {
    "SYSTEMID": "bue-lx-pbw.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 90.866666666667
  },
  {
    "SYSTEMID": "bue-lx-ppi.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 13.19705882352941
  },
  {
    "SYSTEMID": "bue-212-ptx.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 5.3
  },
  {
    "SYSTEMID": "bue-212-pbo.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 4.62727272727273
  },
  {
    "SYSTEMID": "bue-212-dep.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 4.50571428571429
  },
  {
    "SYSTEMID": "bue-212-pep.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 4.34
  },
  {
    "SYSTEMID": "bue-212-qbo.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 3.484375
  },
  {
    "SYSTEMID": "bue-212-dbo.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 3.4214285714285695
  },
  {
    "SYSTEMID": "bue-lx-ps1.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 3.3714285714285697
  },
  {
    "SYSTEMID": "bue-lx-dev.bunge.ar",
    "GBL_MEM_PAGEOUT_RATE": 1.3090909090909097
  }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetTopMemPageoutNodesYesterday/:id', function(req, res) {
    "use strict";
    var id = req.params.id;

    fs.readFile("top_mem_pageout_nodes_yesterday.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetTopMemPageoutNodesYesterday" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});



// RESTFUL API que devuelve los nodos con mayor memory utilization
/**
 * @api {get} /GetTopMemUtilNodes/:id/:days Top 10 customer mem comsumers for the last n days
 * @apiName GetTopMemUtilNodes
 * @apiGroup Performance Mem
 * @apiSampleRequest http://10.10.7.93:8000/GetTopMemUtilNodes/:id/:days
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiParam {Number} days of days backwards to take for the measure
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {Number} GBL_MEM_UTIL Mem utilization
 * @apiSuccessExample Example data on success
 *
 [
  {
    "SYSTEMID": "bue-lx-ppi.bunge.ar",
    "GBL_MEM_UTIL": 70.43648305084744
  },
  {
    "SYSTEMID": "bue-212-dbo.bunge.ar",
    "GBL_MEM_UTIL": 70.08471698113208
  },
  {
    "SYSTEMID": "bue-lx-dpi.bunge.ar",
    "GBL_MEM_UTIL": 69.23348623853211
  },
  {
    "SYSTEMID": "bue-lx-qpi.bunge.ar",
    "GBL_MEM_UTIL": 67.74488505747125
  },
  {
    "SYSTEMID": "bue-212-dep.bunge.ar",
    "GBL_MEM_UTIL": 67.7218410041841
  },
  {
    "SYSTEMID": "bue-212-pbo.bunge.ar",
    "GBL_MEM_UTIL": 57.800956937799036
  },
  {
    "SYSTEMID": "bue-212-qbo.bunge.ar",
    "GBL_MEM_UTIL": 56.15379310344827
  },
  {
    "SYSTEMID": "bue-lx-ps1.bunge.ar",
    "GBL_MEM_UTIL": 54.86592105263157
  },
  {
    "SYSTEMID": "bue-212-pep.bunge.ar",
    "GBL_MEM_UTIL": 53.263691588785036
  },
  {
    "SYSTEMID": "bue-lx-qwd.bunge.ar",
    "GBL_MEM_UTIL": 47.02293333333333
  }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetTopMemUtilNodes/:id/:days', function(req, res) {
    "use strict";
    var id = req.params.id;
    var days = req.params.days;
    fs.readFile("top_mem_util_nodes.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id, days], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetTopMemUtilNodes" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});




// RESTFUL API que devuelve los nodos con mayor memory utilization del ultimo mes
/**
 * @api {get} /GetTopMemUtilNodesLastMonth/:id Top 10 customer mem comsumers for the last month
 * @apiName GetTopMemUtilNodesLastMonth
 * @apiGroup Performance Mem
 * @apiSampleRequest http://10.10.7.93:8000/GetTopMemUtilNodesLastMonth/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {Number} GBL_MEM_UTIL Mem utilization
 * @apiSuccessExample Example data on success
 *
 [
  {
    "SYSTEMID": "bue-lx-ppi.bunge.ar",
    "GBL_MEM_UTIL": 70.43648305084744
  },
  {
    "SYSTEMID": "bue-212-dbo.bunge.ar",
    "GBL_MEM_UTIL": 70.08471698113208
  },
  {
    "SYSTEMID": "bue-lx-dpi.bunge.ar",
    "GBL_MEM_UTIL": 69.23348623853211
  },
  {
    "SYSTEMID": "bue-lx-qpi.bunge.ar",
    "GBL_MEM_UTIL": 67.74488505747125
  },
  {
    "SYSTEMID": "bue-212-dep.bunge.ar",
    "GBL_MEM_UTIL": 67.7218410041841
  },
  {
    "SYSTEMID": "bue-212-pbo.bunge.ar",
    "GBL_MEM_UTIL": 57.800956937799036
  },
  {
    "SYSTEMID": "bue-212-qbo.bunge.ar",
    "GBL_MEM_UTIL": 56.15379310344827
  },
  {
    "SYSTEMID": "bue-lx-ps1.bunge.ar",
    "GBL_MEM_UTIL": 54.86592105263157
  },
  {
    "SYSTEMID": "bue-212-pep.bunge.ar",
    "GBL_MEM_UTIL": 53.263691588785036
  },
  {
    "SYSTEMID": "bue-lx-qwd.bunge.ar",
    "GBL_MEM_UTIL": 47.02293333333333
  }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetTopMemUtilNodesLastMonth/:id', function(req, res) {
    "use strict";
    var id = req.params.id;

    fs.readFile("top_mem_util_nodes_last_month.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetTopMemUtilNodesLastMonth" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});



// RESTFUL API que devuelve los nodos con mayor memory utilization de la ultima semana
/**
 * @api {get} /GetTopMemUtilNodesLastWeek/:id Top 10 customer mem comsumers for the last week
 * @apiName GetTopMemUtilNodesLastWeek
 * @apiGroup Performance Mem
 * @apiSampleRequest http://10.10.7.93:8000/GetTopMemUtilNodesLastWeek/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {Number} GBL_MEM_UTIL Mem utilization
 * @apiSuccessExample Example data on success
 *
 [
  {
    "SYSTEMID": "bue-lx-ppi.bunge.ar",
    "GBL_MEM_UTIL": 70.43648305084744
  },
  {
    "SYSTEMID": "bue-212-dbo.bunge.ar",
    "GBL_MEM_UTIL": 70.08471698113208
  },
  {
    "SYSTEMID": "bue-lx-dpi.bunge.ar",
    "GBL_MEM_UTIL": 69.23348623853211
  },
  {
    "SYSTEMID": "bue-lx-qpi.bunge.ar",
    "GBL_MEM_UTIL": 67.74488505747125
  },
  {
    "SYSTEMID": "bue-212-dep.bunge.ar",
    "GBL_MEM_UTIL": 67.7218410041841
  },
  {
    "SYSTEMID": "bue-212-pbo.bunge.ar",
    "GBL_MEM_UTIL": 57.800956937799036
  },
  {
    "SYSTEMID": "bue-212-qbo.bunge.ar",
    "GBL_MEM_UTIL": 56.15379310344827
  },
  {
    "SYSTEMID": "bue-lx-ps1.bunge.ar",
    "GBL_MEM_UTIL": 54.86592105263157
  },
  {
    "SYSTEMID": "bue-212-pep.bunge.ar",
    "GBL_MEM_UTIL": 53.263691588785036
  },
  {
    "SYSTEMID": "bue-lx-qwd.bunge.ar",
    "GBL_MEM_UTIL": 47.02293333333333
  }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetTopMemUtilNodesLastWeek/:id', function(req, res) {
    "use strict";
    var id = req.params.id;

    fs.readFile("top_mem_util_nodes_last_week.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetTopMemUtilNodesLastWeek" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});


// RESTFUL API que devuelve los nodos con mayor memory utilization de ayer
/**
 * @api {get} /GetTopMemUtilNodesYesterday/:id Top 10 customer mem comsumers for the past day
 * @apiName GetTopMemUtilNodesYesterday
 * @apiGroup Performance Mem
 * @apiSampleRequest http://10.10.7.93:8000/GetTopMemUtilNodesYesterday/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {Number} GBL_MEM_UTIL Mem utilization
 * @apiSuccessExample Example data on success
 *
 [
  {
    "SYSTEMID": "bue-lx-ppi.bunge.ar",
    "GBL_MEM_UTIL": 70.43648305084744
  },
  {
    "SYSTEMID": "bue-212-dbo.bunge.ar",
    "GBL_MEM_UTIL": 70.08471698113208
  },
  {
    "SYSTEMID": "bue-lx-dpi.bunge.ar",
    "GBL_MEM_UTIL": 69.23348623853211
  },
  {
    "SYSTEMID": "bue-lx-qpi.bunge.ar",
    "GBL_MEM_UTIL": 67.74488505747125
  },
  {
    "SYSTEMID": "bue-212-dep.bunge.ar",
    "GBL_MEM_UTIL": 67.7218410041841
  },
  {
    "SYSTEMID": "bue-212-pbo.bunge.ar",
    "GBL_MEM_UTIL": 57.800956937799036
  },
  {
    "SYSTEMID": "bue-212-qbo.bunge.ar",
    "GBL_MEM_UTIL": 56.15379310344827
  },
  {
    "SYSTEMID": "bue-lx-ps1.bunge.ar",
    "GBL_MEM_UTIL": 54.86592105263157
  },
  {
    "SYSTEMID": "bue-212-pep.bunge.ar",
    "GBL_MEM_UTIL": 53.263691588785036
  },
  {
    "SYSTEMID": "bue-lx-qwd.bunge.ar",
    "GBL_MEM_UTIL": 47.02293333333333
  }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetTopMemUtilNodesYesterday/:id', function(req, res) {
    "use strict";
    var id = req.params.id;

    fs.readFile("top_mem_util_nodes_yesterday.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetTopMemUtilNodesYesterday" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});


// RESTFUL API que devuelve los nodos con mayor swap utilization
/**
 * @api {get} /GetTopSwapUtilNodes/:id/:days Top 10 customer swap comsumers for the last n days
 * @apiName GetTopSwapUtilNodes
 * @apiGroup Performance Swap
 * @apiSampleRequest http://10.10.7.93:8000/GetTopSwapUtilNodes/:id/:days
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiParam {Number} days of days backwards to take for the measure
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {Number} GBL_SWAP_SPACE_UTIL Mem utilization
 * @apiSuccessExample Example data on success
 *
 [
  {
    "SYSTEMID": "bue-212-qbo.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 68.8315
  },
  {
    "SYSTEMID": "bue-lx-pbw.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 58
  },
  {
    "SYSTEMID": "bue-212-pbo.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 54.11136363636363
  },
  {
    "SYSTEMID": "bue-212-dbo.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 53.322500000000005
  },
  {
    "SYSTEMID": "bue-212-pep.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 42.7
  },
  {
    "SYSTEMID": "bue-lx-qbw.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 41
  },
  {
    "SYSTEMID": "bue-212-dep.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 40.14615384615384
  },
  {
    "SYSTEMID": "bue-lx-dev.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 26
  },
  {
    "SYSTEMID": "bue-212-ptx.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 22.47727272727272
  },
  {
    "SYSTEMID": "bue-lx-prd3n.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 8
  }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetTopSwapUtilNodes/:id/:days', function(req, res) {
    "use strict";
    var id = req.params.id;
    var days = req.params.days;
    fs.readFile("top_swap_util_nodes.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id, days], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetTopSwapUtilNodes" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});


// RESTFUL API que devuelve los nodos con mayor swap utilization en el ultimo mes
/**
 * @api {get} /GetTopSwapUtilNodesLastMonth/:id Top 10 customer swap comsumers for the last month
 * @apiName GetTopSwapUtilNodesLastMonth
 * @apiGroup Performance Swap
 * @apiSampleRequest http://10.10.7.93:8000/GetTopSwapUtilNodesLastMonth/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {Number} GBL_SWAP_SPACE_UTIL Mem utilization
 * @apiSuccessExample Example data on success
 *
 [
  {
    "SYSTEMID": "bue-212-qbo.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 68.8315
  },
  {
    "SYSTEMID": "bue-lx-pbw.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 58
  },
  {
    "SYSTEMID": "bue-212-pbo.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 54.11136363636363
  },
  {
    "SYSTEMID": "bue-212-dbo.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 53.322500000000005
  },
  {
    "SYSTEMID": "bue-212-pep.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 42.7
  },
  {
    "SYSTEMID": "bue-lx-qbw.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 41
  },
  {
    "SYSTEMID": "bue-212-dep.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 40.14615384615384
  },
  {
    "SYSTEMID": "bue-lx-dev.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 26
  },
  {
    "SYSTEMID": "bue-212-ptx.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 22.47727272727272
  },
  {
    "SYSTEMID": "bue-lx-prd3n.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 8
  }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetTopSwapUtilNodesLastMonth/:id', function(req, res) {
    "use strict";
    var id = req.params.id;

    fs.readFile("top_swap_util_nodes_last_month.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetTopSwapUtilNodesLastMonth" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});



// RESTFUL API que devuelve los nodos con mayor swap utilization en la ultima semana
/**
 * @api {get} /GetTopSwapUtilNodesLastWeek/:id Top 10 customer swap comsumers for the last week
 * @apiName GetTopSwapUtilNodesLastWeek
 * @apiGroup Performance Swap
 * @apiSampleRequest http://10.10.7.93:8000/GetTopSwapUtilNodesLastWeek/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {Number} GBL_SWAP_SPACE_UTIL Mem utilization
 * @apiSuccessExample Example data on success
 *
 [
  {
    "SYSTEMID": "bue-212-qbo.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 68.8315
  },
  {
    "SYSTEMID": "bue-lx-pbw.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 58
  },
  {
    "SYSTEMID": "bue-212-pbo.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 54.11136363636363
  },
  {
    "SYSTEMID": "bue-212-dbo.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 53.322500000000005
  },
  {
    "SYSTEMID": "bue-212-pep.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 42.7
  },
  {
    "SYSTEMID": "bue-lx-qbw.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 41
  },
  {
    "SYSTEMID": "bue-212-dep.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 40.14615384615384
  },
  {
    "SYSTEMID": "bue-lx-dev.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 26
  },
  {
    "SYSTEMID": "bue-212-ptx.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 22.47727272727272
  },
  {
    "SYSTEMID": "bue-lx-prd3n.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 8
  }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetTopSwapUtilNodesLastWeek/:id', function(req, res) {
    "use strict";
    var id = req.params.id;

    fs.readFile("top_swap_util_nodes_last_week.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetTopSwapUtilNodesLastWeek" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});


// RESTFUL API que devuelve los nodos con mayor swap utilization en el día anterior
/**
 * @api {get} /GetTopSwapUtilNodesYesterday/:id Top 10 customer swap comsumers for the past day
 * @apiName GetTopSwapUtilNodesYesterday
 * @apiGroup Performance Swap
 * @apiSampleRequest http://10.10.7.93:8000/GetTopSwapUtilNodesYesterday/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {Number} GBL_SWAP_SPACE_UTIL Mem utilization
 * @apiSuccessExample Example data on success
 *
 [
  {
    "SYSTEMID": "bue-212-qbo.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 68.8315
  },
  {
    "SYSTEMID": "bue-lx-pbw.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 58
  },
  {
    "SYSTEMID": "bue-212-pbo.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 54.11136363636363
  },
  {
    "SYSTEMID": "bue-212-dbo.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 53.322500000000005
  },
  {
    "SYSTEMID": "bue-212-pep.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 42.7
  },
  {
    "SYSTEMID": "bue-lx-qbw.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 41
  },
  {
    "SYSTEMID": "bue-212-dep.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 40.14615384615384
  },
  {
    "SYSTEMID": "bue-lx-dev.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 26
  },
  {
    "SYSTEMID": "bue-212-ptx.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 22.47727272727272
  },
  {
    "SYSTEMID": "bue-lx-prd3n.bunge.ar",
    "GBL_SWAP_SPACE_UTIL": 8
  }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetTopSwapUtilNodesYesterday/:id', function(req, res) {
    "use strict";
    var id = req.params.id;

    fs.readFile("top_swap_util_nodes_yesterday.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetTopSwapUtilNodesYesterday" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});



// RESTFUL API que devuelve las métricas globales del nodo entre fechas 
/**
 * @api {get} /GetNodeGblMetricsFromTo/:id/:date1/:date2 Node global metrics between dates
 * @apiName GetNodeGblMetricFromTo
 * @apiGroup Performance Global Metrics
 * @apiSampleRequest http://10.10.7.93:8000/GetNodeGblMetricsFromTo/:id/:date1/:date2
 * @apiVersion 0.1.0
 * @apiParam {String} id Node name
 * @apiParam {Datetime} date1 Datetime in format (yyyy-mm-dd HH-mm-ss) of the date from parameter
 * @apiParam {Datetime} date2 Datetime in format (yyyy-mm-dd HH-mm-ss) of the date to parameter
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {Number} GBL_MEM_UTIL Mem utilization
 * @apiSuccess {Number} GBL_SWAP_SPACE_UTIL Swap space utilization
 * @apiSuccess {Number} GBL_MEM_PAGEOUT_RATE Memory pageout rate
 * @apiSuccess {Number} GBL_CPU_TOTAL_UTIL Cpu total utilization
 * @apiSuccessExample Example data on success
 *
 *[
  {
    "ID": 109603006,
    "SYSTEMNAME": "bue-lx-prd1n.bunge.ar",
    "DATETIME": "2017-05-01T15:00:00.000Z",
    "GMT": "2017-05-01T18:00:00.000Z",
    "SHIFTNAME": "OFFSHIFT",
    "GBL_INTERVAL": 1799,
    "GBL_SWAP_SPACE_UTIL": 0,
    "GBL_CPU_TOTAL_UTIL": 5.84,
    "INTERVAL": 1799,
    "GBL_MEM_UTIL": 39.01,
    "GBL_MEM_PAGEOUT_RATE": 0,
    "GBL_DISK_PHYS_IO_RATE": 139.5
  },
  {
    "ID": 109603007,
    "SYSTEMNAME": "bue-lx-prd1n.bunge.ar",
    "DATETIME": "2017-05-01T15:30:00.000Z",
    "GMT": "2017-05-01T18:30:00.000Z",
    "SHIFTNAME": "OFFSHIFT",
    "GBL_INTERVAL": 1800,
    "GBL_SWAP_SPACE_UTIL": 0,
    "GBL_CPU_TOTAL_UTIL": 5.25,
    "INTERVAL": 1800,
    "GBL_MEM_UTIL": 38.99,
    "GBL_MEM_PAGEOUT_RATE": 0,
    "GBL_DISK_PHYS_IO_RATE": 279.90000000000003
  }
]
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetNodeGblMetricsFromTo/:id/:date1/:date2', function(req, res) {
    "use strict";
    var id = req.params.id;
    var date1 = req.params.date1;
    var date2 = req.params.date2;
    console.log(date1);
    console.log(date2);

    fs.readFile("node_metrics_from_to.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id, date1, date2], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetNodeGblMetricsFromTo" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});



// RESTFUL API que devuelve los nodos con indisponibilidad los ultimos n dias
/**
 * @api {get} /GetDownMinNodes/:id/:days Down nodes for the last n days
 * @apiName GetDownMinNodes
 * @apiGroup Performance Downtime
 * @apiSampleRequest http://10.10.7.93:8000/GetDownMinNodes/:id/:days
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiParam {Number} days of days backwards to take for the measure
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {Number} SYSDOWNMINS Down minutes
 * @apiSuccessExample Example data on success
 * [
    {
        "SYSTEMID": "bue-lx-dbw.bunge.ar",
        "SYSDOWNMINS": 267
    },
    {
        "SYSTEMID": "bue-lx-qa4.bunge.ar",
        "SYSDOWNMINS": 23
    },
    {
        "SYSTEMID": "bue-ha-dev1.bunge.ar",
        "SYSDOWNMINS": 12
    },
    {
        "SYSTEMID": "bue-212-dbo.bunge.ar",
        "SYSDOWNMINS": 8
    },
    {
        "SYSTEMID": "bue-212-qbo.bunge.ar",
        "SYSDOWNMINS": 4
    },
    {
        "SYSTEMID": "bue-lx-qa6.bunge.ar",
        "SYSDOWNMINS": 3
    },
    {
        "SYSTEMID": "bue-lx-qpi.bunge.ar",
        "SYSDOWNMINS": 2
    }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetDownMinNodes/:id/:days', function(req, res) {
    "use strict";
    var id = req.params.id;
    var days = req.params.days;
    fs.readFile("downtime_nodes.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id, days], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetDownMinNodes" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});


// RESTFUL API que devuelve los nodos con indisponibilidad durante el ultimo mes
/**
 * @api {get} /GetDownMinNodesLastMonth/:id Down nodes for the last month
 * @apiName GetDownMinNodesLastMonth
 * @apiGroup Performance Downtime
 * @apiSampleRequest http://10.10.7.93:8000/GetDownMinNodesLastMonth/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {Number} SYSDOWNMINS Down minutes
 * @apiSuccessExample Example data on success
 *  [
    {
        "SYSTEMID": "bue-lx-dbw.bunge.ar",
        "SYSDOWNMINS": 267
    },
    {
        "SYSTEMID": "bue-lx-qa4.bunge.ar",
        "SYSDOWNMINS": 23
    },
    {
        "SYSTEMID": "bue-ha-dev1.bunge.ar",
        "SYSDOWNMINS": 12
    },
    {
        "SYSTEMID": "bue-212-dbo.bunge.ar",
        "SYSDOWNMINS": 8
    },
    {
        "SYSTEMID": "bue-212-qbo.bunge.ar",
        "SYSDOWNMINS": 4
    },
    {
        "SYSTEMID": "bue-lx-qa6.bunge.ar",
        "SYSDOWNMINS": 3
    },
    {
        "SYSTEMID": "bue-lx-qpi.bunge.ar",
        "SYSDOWNMINS": 2
    }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetDownMinNodesLastMonth/:id', function(req, res) {
    "use strict";
    var id = req.params.id;

    fs.readFile("downtime_nodes_last_month.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetDownMinNodesLastMonth" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});


// RESTFUL API que devuelve los nodos con indisponibilidad durante la ultima semana
/**
 * @api {get} /GetDownMinNodesLastWeek/:id Down nodes for the last month
 * @apiName GetDownMinNodesLastWeek
 * @apiGroup Performance Downtime
 * @apiSampleRequest http://10.10.7.93:8000/GetDownMinNodesLastWeek/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {Number} SYSDOWNMINS Down minutes
 * @apiSuccessExample Example data on success
 *  [
    {
        "SYSTEMID": "bue-lx-dbw.bunge.ar",
        "SYSDOWNMINS": 267
    },
    {
        "SYSTEMID": "bue-lx-qa4.bunge.ar",
        "SYSDOWNMINS": 23
    },
    {
        "SYSTEMID": "bue-ha-dev1.bunge.ar",
        "SYSDOWNMINS": 12
    },
    {
        "SYSTEMID": "bue-212-dbo.bunge.ar",
        "SYSDOWNMINS": 8
    },
    {
        "SYSTEMID": "bue-212-qbo.bunge.ar",
        "SYSDOWNMINS": 4
    },
    {
        "SYSTEMID": "bue-lx-qa6.bunge.ar",
        "SYSDOWNMINS": 3
    },
    {
        "SYSTEMID": "bue-lx-qpi.bunge.ar",
        "SYSDOWNMINS": 2
    }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetDownMinNodesLastWeek/:id', function(req, res) {
    "use strict";
    var id = req.params.id;

    fs.readFile("downtime_nodes_last_week.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetDownMinNodesLastWeek" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});


// RESTFUL API que devuelve los nodos con indisponibilidad durante el ultimo día
/**
 * @api {get} /GetDownMinNodesYesterday/:id Down nodes for the past day
 * @apiName GetDownMinNodesYesterday
 * @apiGroup Performance Downtime
 * @apiSampleRequest http://10.10.7.93:8000/GetDownMinNodesYesterday/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {Number} SYSDOWNMINS Down minutes
 * @apiSuccessExample Example data on success
 *  [
    {
        "SYSTEMID": "bue-lx-dbw.bunge.ar",
        "SYSDOWNMINS": 267
    },
    {
        "SYSTEMID": "bue-lx-qa4.bunge.ar",
        "SYSDOWNMINS": 23
    },
    {
        "SYSTEMID": "bue-ha-dev1.bunge.ar",
        "SYSDOWNMINS": 12
    },
    {
        "SYSTEMID": "bue-212-dbo.bunge.ar",
        "SYSDOWNMINS": 8
    },
    {
        "SYSTEMID": "bue-212-qbo.bunge.ar",
        "SYSDOWNMINS": 4
    },
    {
        "SYSTEMID": "bue-lx-qa6.bunge.ar",
        "SYSDOWNMINS": 3
    },
    {
        "SYSTEMID": "bue-lx-qpi.bunge.ar",
        "SYSDOWNMINS": 2
    }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetDownMinNodesYesterday/:id', function(req, res) {
    "use strict";
    var id = req.params.id;

    fs.readFile("downtime_nodes_yesterday.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetDownMinNodesYesterday" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});




// RESTFUL API que devuelve el ultimo valor de FS_SPACE_UTIL de los nodos de un cliente
/**
 * @api {get} /GetLastFSUtilNodes/:id Customer last FS utilization measure
 * @apiName GetLastFSUtilNodes
 * @apiGroup Performance FS
 * @apiSampleRequest http://10.10.7.93:8000/GetLastFSUtilNodes/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {String} FS_DIRNAME Dir or Filessyten name
 * @apiSuccess {Number} FS_SPACE_UTIL Space utilization percentage
 * @apiSuccess {Number} FS_MAX_SIZE Filesystem size in megabytes
 * @apiSuccess {Number} FS_SPACE_USED Amount of megabytes used
 * @apiSuccess {datetime} DATETIME Datetime for the measure
 * @apiSuccess {datetime} GMT Datetime for the measure in GMT
 * @apiSuccessExample Example data on success
 *
 [
  {
    "SYSTEMNAME": "bue-212-dbo.bunge.ar",
    "GMT": "2017-06-12T06:00:00.000Z",
    "DATETIME": "2017-06-12T03:00:00.000Z",
    "FS_DIRNAME": "D:",
    "FS_MAX_SIZE": 61438,
    "FS_SPACE_USED": 56176,
    "FS_SPACE_UTIL": 91.43
  },
  {
    "SYSTEMNAME": "bue-212-dbo.bunge.ar",
    "GMT": "2017-06-12T06:00:00.000Z",
    "DATETIME": "2017-06-12T03:00:00.000Z",
    "FS_DIRNAME": "C:",
    "FS_MAX_SIZE": 122527,
    "FS_SPACE_USED": 28913,
    "FS_SPACE_UTIL": 23.59
  },
  {
    "SYSTEMNAME": "bue-212-dep.bunge.ar",
    "GMT": "2017-06-12T06:00:00.000Z",
    "DATETIME": "2017-06-12T03:00:00.000Z",
    "FS_DIRNAME": "E:",
    "FS_MAX_SIZE": 327550,
    "FS_SPACE_USED": 235390,
    "FS_SPACE_UTIL": 71.86
  },
  {
    "SYSTEMNAME": "bue-212-dep.bunge.ar",
    "GMT": "2017-06-12T06:00:00.000Z",
    "DATETIME": "2017-06-12T03:00:00.000Z",
    "FS_DIRNAME": "D:",
    "FS_MAX_SIZE": 102270,
    "FS_SPACE_USED": 57832,
    "FS_SPACE_UTIL": 56.54
  },
  {
    "SYSTEMNAME": "bue-212-dep.bunge.ar",
    "GMT": "2017-06-12T06:00:00.000Z",
    "DATETIME": "2017-06-12T03:00:00.000Z",
    "FS_DIRNAME": "C:",
    "FS_MAX_SIZE": 122527,
    "FS_SPACE_USED": 65763,
    "FS_SPACE_UTIL": 53.660000000000004
  }
  ]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetLastFSUtilNodes/:id', function(req, res) {
    "use strict";
    var id = req.params.id;
    var days = req.params.days;
    fs.readFile("last_fs_util_nodes.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetLastFSUtilNodes" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});

// RESTFUL API que devuelve valores de metricas de filesystems de un nodo entre fechas
/**
 * @api {get} /GetNodeFSMetricsFromTo/:id/:date1/:date2 Node FS metrics between dates
 * @apiName GetNodeFSMetricsFromTo
 * @apiGroup Performance FS
 * @apiSampleRequest http://10.10.7.93:8000/GetNodeFSMetricsFromTo/:id/:date1/:date2
 * @apiVersion 0.1.0
 * @apiParam {String} id Node name
 * @apiParam {Datetime} date1 Datetime in format (yyyy-mm-dd HH-mm-ss) of the date from parameter
 * @apiParam {Datetime} date2 Datetime in format (yyyy-mm-dd HH-mm-ss) of the date to parameter
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {String} FS_DIRNAME Dir or Filessyten name
 * @apiSuccess {Number} FS_SPACE_UTIL Space utilization percentage
 * @apiSuccess {Number} FS_MAX_SIZE Filesystem size in megabytes
 * @apiSuccess {Number} FS_SPACE_USED Amount of megabytes used
 * @apiSuccess {datetime} DATETIME Datetime for the measure
 * @apiSuccess {datetime} GMT Datetime for the measure in GMT
 * @apiSuccessExample Example data on success
 *[
  {
    "ID": 267230851,
    "SYSTEMNAME": "ats-sg-app-01.rsi.ar",
    "DATETIME": "2017-06-10T00:00:00.000Z",
    "GMT": "2017-06-10T03:00:00.000Z",
    "SHIFTNAME": "OFFSHIFT",
    "FS_SPACE_USED": 47720,
    "FS_MAX_SIZE": 204697,
    "FS_DIRNAME": "C:",
    "INTERVAL": 3600,
    "FS_SPACE_UTIL": 23.31
  },
  {
    "ID": 267230875,
    "SYSTEMNAME": "ats-sg-app-01.rsi.ar",
    "DATETIME": "2017-06-10T00:00:00.000Z",
    "GMT": "2017-06-10T03:00:00.000Z",
    "SHIFTNAME": "OFFSHIFT",
    "FS_SPACE_USED": 5778,
    "FS_MAX_SIZE": 307197,
    "FS_DIRNAME": "E:",
    "INTERVAL": 3600,
    "FS_SPACE_UTIL": 1.8800000000000001
  },
  {
    "ID": 267230852,
    "SYSTEMNAME": "ats-sg-app-01.rsi.ar",
    "DATETIME": "2017-06-10T01:00:00.000Z",
    "GMT": "2017-06-10T04:00:00.000Z",
    "SHIFTNAME": "OFFSHIFT",
    "FS_SPACE_USED": 47721,
    "FS_MAX_SIZE": 204697,
    "FS_DIRNAME": "C:",
    "INTERVAL": 3600,
    "FS_SPACE_UTIL": 23.31
  },
  {
    "ID": 267230876,
    "SYSTEMNAME": "ats-sg-app-01.rsi.ar",
    "DATETIME": "2017-06-10T01:00:00.000Z",
    "GMT": "2017-06-10T04:00:00.000Z",
    "SHIFTNAME": "OFFSHIFT",
    "FS_SPACE_USED": 5778,
    "FS_MAX_SIZE": 307197,
    "FS_DIRNAME": "E:",
    "INTERVAL": 3600,
    "FS_SPACE_UTIL": 1.8800000000000001
  }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetNodeFSMetricsFromTo/:id/:date1/:date2', function(req, res) {
    "use strict";
    var id = req.params.id;
    var date1 = req.params.date1;
    var date2 = req.params.date2;
    fs.readFile("node_fsmetrics_from_to.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id, date1, date2], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetNodeFSMetricsFromTo" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});

// RESTFUL API que devuelve el inventarios de nodos monitoreados del cliente
/**
 * @api {get} /GetCustAssets/:id Customer monitored assets
 * @apiName GetCustAssets
 * @apiGroup Assets
 * @apiSampleRequest http://10.10.7.93:8000/GetCustAssets/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiError 400 Error connecting to DB
 * @apiError 404 DB Read error 
 * @apiSuccess {String} SYSTEMID Node name
 * @apiSuccess {String} OSNAME OS Platform Name
 * @apiSuccess {String} OSVERSION OS Version
 * @apiSuccess {String} MACHINETYPE Machine architecture
 * @apiSuccess {String} AGENT HPO Agent Version
 * @apiSuccess {Number} CPUS Number of CPU cores
 * @apiSuccess {Number} DISKS Number of disks
 * @apiSuccess {Number} NETWORKS Number of networks
 * @apiSuccess {Number} MEMORY Ammount of memory Kilobytes
 * @apiSuccess {Number} SWAP Ammount of swap space Kilobytes
 * @apiSuccess {String} IPADDRESS IP monitoring address
 * @apiSuccess {String} V_SYSTEM_TYPE Virtualization technology type
 * @apiSuccess {String} V_SYSTEM_ROLE Virtualization role
 * @apiSuccess {String} V_SYSTEM_VERSION Virtualization software version


 * @apiSuccessExample Example data on success
 *[
    {
        "SYSTEMID": "bue-212-dep.bunge.ar",
        "OSNAME": "NT",
        "OSRELEASE": "6.3",
        "OSVERSION": "None",
        "MACHINETYPE": "Intel64",
        "AGENT": "SCOPE/NT 11.14.014(4)",
        "CPUS": 8,
        "DISKS": 3,
        "NETWORKS": 4,
        "MEMORY": 16383,
        "SWAP": 37747712,
        "IPADDRESS": "10.211.9.211",
        "V_SYSTEM_TYPE": "VMware",
        "V_SYSTEM_ROLE": "Guest",
        "V_SYSTEM_VERSION": null
    },
    {
        "SYSTEMID": "bue-lx-de2.bunge.ar",
        "OSNAME": "Linux",
        "OSRELEASE": "2.6.32-642.15.1.el6.x86_",
        "OSVERSION": "#1 SMP Mon Feb 20 02:26:38 EST 2017",
        "MACHINETYPE": "x86_64",
        "AGENT": "SCOPE/UX 11.14.014(4)",
        "CPUS": 4,
        "DISKS": 11,
        "NETWORKS": 3,
        "MEMORY": 15955,
        "SWAP": 8387584,
        "IPADDRESS": "10.211.9.233",
        "V_SYSTEM_TYPE": "VMware",
        "V_SYSTEM_ROLE": "Guest",
        "V_SYSTEM_VERSION": "Red Hat Enterprise Linux Server release 6.8 (Santi"
    },
    {
        "SYSTEMID": "bue-lx-de3.bunge.ar",
        "OSNAME": "Linux",
        "OSRELEASE": "2.6.32-642.13.1.el6.x86_",
        "OSVERSION": "#1 SMP Wed Nov 23 16:03:01 EST 2016",
        "MACHINETYPE": "x86_64",
        "AGENT": "SCOPE/UX 11.14.014(4)",
        "CPUS": 4,
        "DISKS": 11,
        "NETWORKS": 3,
        "MEMORY": 15955,
        "SWAP": 8387584,
        "IPADDRESS": "10.211.9.234",
        "V_SYSTEM_TYPE": "VMware",
        "V_SYSTEM_ROLE": "Guest",
        "V_SYSTEM_VERSION": "Red Hat Enterprise Linux Server release 6.8 (Santi"
    },
    {
        "SYSTEMID": "bue-lx-pwd.bunge.ar",
        "OSNAME": "Linux",
        "OSRELEASE": "3.10.0-514.6.1.el7.x86_6",
        "OSVERSION": "#1 SMP Sat Dec 10 11:15:38 EST 2016",
        "MACHINETYPE": "x86_64",
        "AGENT": "SCOPE/UX 11.14.014(4)",
        "CPUS": 4,
        "DISKS": 3,
        "NETWORKS": 3,
        "MEMORY": 7834,
        "SWAP": 8387584,
        "IPADDRESS": "10.211.20.80",
        "V_SYSTEM_TYPE": "VMware",
        "V_SYSTEM_ROLE": "Guest",
        "V_SYSTEM_VERSION": "Red Hat Enterprise Linux Server release 7.3 (Maipo"
    }
]
 *
 * @apiErrorExample Example data on error
 * {  "status": 404,
  "message": "DB Read error"
}
 */
app.get('/GetCustAssets/:id', function(req, res) {
    "use strict";
    var id = req.params.id;

    fs.readFile("cust_assets.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPR, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [id], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetCustAssets" + req.params.id + "  : Connection released");
                            }
                        });
                });
        });

    });

});


// RESTFUL API que devuelve los nodos de saplatam nodegroup
/** 
 * @apiGroup Nodes
 */
app.get('/GetSaplatamNodes', function(req, res) {
    "use strict";
    var id = req.params.id;

    fs.readFile("saplatam_nodes.sql", function(err, data) {
        if (err) {
            throw err;
        }
        oracledb.getConnection(connAttrs_HPO, function(err, connection) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(400), send(JSON.stringify({
                    status: 400,
                    message: "Error connecting to DB"
                }));
                return;
            }
            connection.execute(
                data.toString(), [], { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        var status = 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: "DB Read error"
                        }));
                    } else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    connection.release(
                        function(err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /GetSaplatamNodes: Connection released");
                            }
                        });
                });
        });

    });

});



// RESTFUL API que devuelve los ultimos X dias metrica DBSPI_ORA_GRAPH
/** 
 * @apiGroup Metrics
 */
app.get('/GetOraOsmMetrics/:node/:days', function(req, res) {
    "use strict";
    var node = req.params.node;
    var days = req.params.days;

    oracledb.getConnection(connAttrs_HPR, function(err, connection) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500), send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        connection.execute(
            "SELECT * FROM ORAOSM_METRICS WHERE SYSTEMNAME = :node AND DATETIME > (sysdate - :days) ORDER BY DATETIME", [node, days], { outFormat: oracledb.OBJECT },
            function(err, result) {
                if (err || result.rows.length < 1) {
                    res.set('Content-Type', 'application/json');
                    var status = err ? 500 : 404;
                    res.status(status).send(JSON.stringify({
                        status: status,
                        message: err ? "Error getting the customer messages" : "No messages or no customer nodes monitored",
                        detailed_message: err ? err.message : ""
                    }));
                } else {
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                }
                connection.release(
                    function(err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            //console.log("GET /api/gbl/" + req.params.id + " : Connection released");
                            console.log("GET /GetOraGraphMetrics/" + req.params.node + "/" + req.params.days + ": Connection released");
                        }
                    });
            });
    });
});

// RESTFUL API que devuelve los ultimos X dias metrica DBSPI_ORA_GRAPH
/** 
 * @apiGroup Metrics
 */
app.get('/GetOraGraphMetrics/:node/:days', function(req, res) {
    "use strict";
    var node = req.params.node;
    var days = req.params.days;

    oracledb.getConnection(connAttrs_HPR, function(err, connection) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500), send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        connection.execute(
            "SELECT * FROM DBSPI_ORA_GRAPH WHERE SYSTEMNAME = :node AND DATETIME > (sysdate - :days) ORDER BY DATETIME", [node, days], { outFormat: oracledb.OBJECT },
            function(err, result) {
                if (err || result.rows.length < 1) {
                    res.set('Content-Type', 'application/json');
                    var status = err ? 500 : 404;
                    res.status(status).send(JSON.stringify({
                        status: status,
                        message: err ? "Error getting the customer messages" : "No messages or no customer nodes monitored",
                        detailed_message: err ? err.message : ""
                    }));
                } else {
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                }
                connection.release(
                    function(err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            //console.log("GET /api/gbl/" + req.params.id + " : Connection released");
                            console.log("GET /GetOraGraphMetrics/" + req.params.node + "/" + req.params.days + ": Connection released");
                        }
                    });
            });
    });
});


// RESTFUL API que devuelve las estructura de reportes
/**
 * @api {get} /GetReports/:id Available report list for a customer
 * @apiName GetReports
 * @apiGroup Reports
 * @apiSampleRequest http://10.10.7.93:8000/GetReports/:id
 * @apiVersion 0.1.0
 * @apiParam {String} id Siebel ID (Master Account ID) for the customer
 * @apiSuccess {string} path Pathname of the report. 
 * @apiSuccess {number} size Size of file
 * @apiSuccessExample Example data on success
 *[
  {
    "path": "/app/reports/Apr-16/client_cpu_summary/1-CNK1/Client_CPU_summary.pdf",
    "size": 87604
  },
  {
    "path": "/app/reports/Apr-16/client_fs_high_use/1-CNK1/Client_FS_high_use.pdf",
    "size": 81037
  },
  {
    "path": "/app/reports/Apr-16/client_fs_less_use/1-CNK1/Client_FS_less_use.pdf",
    "size": 81494
  },
    "path": "/app/reports/Dec-15/client_fs_high_use/1-CNK1/Client_FS_high_use.pdf",
    "size": 81089
  },
  {
    "path": "/app/reports/Dec-15/client_fs_less_use/1-CNK1/Client_FS_less_use.pdf",
    "size": 81428
  },
  {
    "path": "/app/reports/Dec-15/client_memory_summary/1-CNK1/Client_Memory_summary.pdf",
    "size": 87031
  },
  {
    "path": "/app/reports/Dec-15/client_uptime/1-CNK1/Client_Uptime.pdf",
  },
  {
    "path": "/app/reports/Jan-17/client_cpu_summary/1-CNK1/Client_CPU_summary.pdf",
    "size": 88840
  },
  {
    "path": "/app/reports/Jan-17/client_fs_high_use/1-CNK1/Client_FS_high_use.pdf",
    "size": 80683
  },
  {
    "path": "/app/reports/Jan-17/client_fs_less_use/1-CNK1/Client_FS_less_use.pdf",
    "size": 81638
  },
  {
    "path": "/app/reports/Jan-17/client_memory_summary/1-CNK1/Client_Memory_summary.pdf",
  {
    "path": "/app/reports/Jun-16/client_cpu_summary/1-CNK1/Client_CPU_summary.pdf",
    "size": 88054
  },
  {
    "path": "/app/reports/Jun-16/client_fs_high_use/1-CNK1/Client_FS_high_use.pdf",
    "size": 80823
  },
  {
    "path": "/app/reports/Jun-16/client_fs_less_use/1-CNK1/Client_FS_less_use.pdf",
    "size": 81358
  {
    "path": "/app/reports/May-16/client_fs_less_use/1-CNK1/Client_FS_less_use.pdf",
    "size": 81385
  },
  {
    "path": "/app/reports/May-16/client_memory_summary/1-CNK1/Client_Memory_summary.pdf",
    "size": 87071
  },
  {
    "path": "/app/reports/May-16/client_uptime/1-CNK1/Client_Uptime.pdf",
    "size": 90317
  },
  {
    "path": "/app/reports/Nov-15/client_cpu_summary/1-CNK1/Client_CPU_summary.pdf",
    "size": 87269
  },
  {
    "path": "/app/reports/Nov-15/client_fs_high_use/1-CNK1/Client_FS_high_use.pdf",
    "size": 80744
  },
  {
    "path": "/app/reports/Nov-15/client_fs_less_use/1-CNK1/Client_FS_less_use.pdf",
    "size": 81234
  },
  {
    "path": "/app/reports/Oct-15/client_memory_summary/1-CNK1/Client_Memory_summary.pdf",
    "size": 86559
  },
  {
    "path": "/app/reports/Oct-15/client_uptime/1-CNK1/Client_Uptime.pdf",
    "size": 90849
  },
  {
    "path": "/app/reports/Oct-16/client_cpu_summary/1-CNK1/Client_CPU_summary.pdf",
    "size": 88613
  },
  {
    "path": "/app/reports/Sep-16/client_uptime/1-CNK1/Client_Uptime.pdf",
    "size": 90559
  }
]

 */

app.get('/GetReports/:id', function(req, res) {
    "use strict";
    var id = req.params.id;
    var result = new Array();
    var tree = dirTree('/app/reports/', { extensions: /\.pdf$/ }, function(item, PATH) {
        if (item.path.indexOf(id) >= 0) {
            result.push({ "path": item.path, "size": item.size });
        }
    });
    res.contentType('application/json').status(200).send(JSON.stringify(result));
});



// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('pages/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('pages/error', {
        message: err.message,
        error: {}
    });
});

//start server
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
var server = app.listen(8000, function() {

    console.log('App listening on port', this.address().port);

});


module.exports = app;