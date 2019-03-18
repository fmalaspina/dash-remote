define({ "api": [
  {
    "type": "get",
    "url": "/GetCustAssets/:id",
    "title": "Customer monitored assets",
    "name": "GetCustAssets",
    "group": "Assets",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetCustAssets/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "OSNAME",
            "description": "<p>OS Platform Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "OSVERSION",
            "description": "<p>OS Version</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "MACHINETYPE",
            "description": "<p>Machine architecture</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "AGENT",
            "description": "<p>HPO Agent Version</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "CPUS",
            "description": "<p>Number of CPU cores</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "DISKS",
            "description": "<p>Number of disks</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "NETWORKS",
            "description": "<p>Number of networks</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "MEMORY",
            "description": "<p>Ammount of memory Kilobytes</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "SWAP",
            "description": "<p>Ammount of swap space Kilobytes</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "IPADDRESS",
            "description": "<p>IP monitoring address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "V_SYSTEM_TYPE",
            "description": "<p>Virtualization technology type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "V_SYSTEM_ROLE",
            "description": "<p>Virtualization role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "V_SYSTEM_VERSION",
            "description": "<p>Virtualization software version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "[\n    {\n        \"SYSTEMID\": \"bue-212-dep.bunge.ar\",\n        \"OSNAME\": \"NT\",\n        \"OSRELEASE\": \"6.3\",\n        \"OSVERSION\": \"None\",\n        \"MACHINETYPE\": \"Intel64\",\n        \"AGENT\": \"SCOPE/NT 11.14.014(4)\",\n        \"CPUS\": 8,\n        \"DISKS\": 3,\n        \"NETWORKS\": 4,\n        \"MEMORY\": 16383,\n        \"SWAP\": 37747712,\n        \"IPADDRESS\": \"10.211.9.211\",\n        \"V_SYSTEM_TYPE\": \"VMware\",\n        \"V_SYSTEM_ROLE\": \"Guest\",\n        \"V_SYSTEM_VERSION\": null\n    },\n    {\n        \"SYSTEMID\": \"bue-lx-de2.bunge.ar\",\n        \"OSNAME\": \"Linux\",\n        \"OSRELEASE\": \"2.6.32-642.15.1.el6.x86_\",\n        \"OSVERSION\": \"#1 SMP Mon Feb 20 02:26:38 EST 2017\",\n        \"MACHINETYPE\": \"x86_64\",\n        \"AGENT\": \"SCOPE/UX 11.14.014(4)\",\n        \"CPUS\": 4,\n        \"DISKS\": 11,\n        \"NETWORKS\": 3,\n        \"MEMORY\": 15955,\n        \"SWAP\": 8387584,\n        \"IPADDRESS\": \"10.211.9.233\",\n        \"V_SYSTEM_TYPE\": \"VMware\",\n        \"V_SYSTEM_ROLE\": \"Guest\",\n        \"V_SYSTEM_VERSION\": \"Red Hat Enterprise Linux Server release 6.8 (Santi\"\n    },\n    {\n        \"SYSTEMID\": \"bue-lx-de3.bunge.ar\",\n        \"OSNAME\": \"Linux\",\n        \"OSRELEASE\": \"2.6.32-642.13.1.el6.x86_\",\n        \"OSVERSION\": \"#1 SMP Wed Nov 23 16:03:01 EST 2016\",\n        \"MACHINETYPE\": \"x86_64\",\n        \"AGENT\": \"SCOPE/UX 11.14.014(4)\",\n        \"CPUS\": 4,\n        \"DISKS\": 11,\n        \"NETWORKS\": 3,\n        \"MEMORY\": 15955,\n        \"SWAP\": 8387584,\n        \"IPADDRESS\": \"10.211.9.234\",\n        \"V_SYSTEM_TYPE\": \"VMware\",\n        \"V_SYSTEM_ROLE\": \"Guest\",\n        \"V_SYSTEM_VERSION\": \"Red Hat Enterprise Linux Server release 6.8 (Santi\"\n    },\n    {\n        \"SYSTEMID\": \"bue-lx-pwd.bunge.ar\",\n        \"OSNAME\": \"Linux\",\n        \"OSRELEASE\": \"3.10.0-514.6.1.el7.x86_6\",\n        \"OSVERSION\": \"#1 SMP Sat Dec 10 11:15:38 EST 2016\",\n        \"MACHINETYPE\": \"x86_64\",\n        \"AGENT\": \"SCOPE/UX 11.14.014(4)\",\n        \"CPUS\": 4,\n        \"DISKS\": 3,\n        \"NETWORKS\": 3,\n        \"MEMORY\": 7834,\n        \"SWAP\": 8387584,\n        \"IPADDRESS\": \"10.211.20.80\",\n        \"V_SYSTEM_TYPE\": \"VMware\",\n        \"V_SYSTEM_ROLE\": \"Guest\",\n        \"V_SYSTEM_VERSION\": \"Red Hat Enterprise Linux Server release 7.3 (Maipo\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Assets"
  },
  {
    "type": "get",
    "url": "/GetDetailCustMessages/:id",
    "title": "Detail messages for a customer",
    "name": "GetDetailCustMessages",
    "group": "Messages",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetDetailCustMessages/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "DUPLICATES",
            "description": "<p>Number of duplicated alarms</p>"
          },
          {
            "group": "Success 200",
            "type": "Datetime",
            "optional": false,
            "field": "DATETIME",
            "description": "<p>Alarm receiving time</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SEVERITY",
            "description": "<p>Alarm severity</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "MESSAGE_GROUP",
            "description": "<p>Workgroup attending alarm</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "APPLICATION",
            "description": "<p>Name of the application being monitored and affected</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "OBJECT",
            "description": "<p>Object with issue</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "MESSAGE_TEXT",
            "description": "<p>Text of the alarm</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "[\n    {\n        \"DUPLICATES\": \"87\",\n        \"DATETIME\": \"01/28/17 20:06:06\",\n        \"SEVERITY\": \"major\",\n        \"MESSAGE_GROUP\": \"SAP\",\n        \"APPLICATION\": \"SAP\",\n        \"OBJECT\": \"PRD 00\",\n        \"SYSTEMID\": \"bue-lx-prd1n.bunge.ar\",\n        \"MESSAGE_TEXT\": \"! - 40 update errors occurred on host bue-lx-prd1n; sid:PRD.\"\n    },\n    {\n        \"DUPLICATES\": \"176\",\n        \"DATETIME\": \"01/28/17 19:30:08\",\n        \"SEVERITY\": \"major\",\n        \"MESSAGE_GROUP\": \"SAP\",\n        \"APPLICATION\": \"SAP\",\n        \"OBJECT\": \"PRD 00\",\n        \"SYSTEMID\": \"bue-lx-prd1n.bunge.ar\",\n        \"MESSAGE_TEXT\": \"! - Number of spool requests entries: 30307 ; Configured threshold is: 20000.\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Messages"
  },
  {
    "type": "get",
    "url": "/GetDetailNodeMessages/:id",
    "title": "Detail messages for a node",
    "name": "GetDetailNodeMessages",
    "group": "Messages",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetDetailNodeMessages/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Full hostname of the node</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "DUPLICATES",
            "description": "<p>Number of duplicated alarms</p>"
          },
          {
            "group": "Success 200",
            "type": "Datetime",
            "optional": false,
            "field": "DATETIME",
            "description": "<p>Alarm receiving time</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SEVERITY",
            "description": "<p>Alarm severity</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "MESSAGE_GROUP",
            "description": "<p>Workgroup attending alarm</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "APPLICATION",
            "description": "<p>Name of the application being monitored and affected</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "OBJECT",
            "description": "<p>Object with issue</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "MESSAGE_TEXT",
            "description": "<p>Text of the alarm</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "[\n    {\n        \"DUPLICATES\": \"87\",\n        \"DATETIME\": \"01/28/17 20:06:06\",\n        \"SEVERITY\": \"major\",\n        \"MESSAGE_GROUP\": \"SAP\",\n        \"OBJECT\": \"PRD 00\",\n        \"SYSTEMID\": \"bue-lx-prd1n.bunge.ar\",\n        \"MESSAGE_TEXT\": \"! - 40 update errors occurred on host bue-lx-prd1n; sid:PRD.\"\n    },\n    {\n        \"DUPLICATES\": \"176\",\n        \"DATETIME\": \"01/28/17 19:30:08\",\n        \"SEVERITY\": \"major\",\n        \"MESSAGE_GROUP\": \"SAP\",\n        \"OBJECT\": \"PRD 00\",\n        \"SYSTEMID\": \"bue-lx-prd1n.bunge.ar\",\n        \"MESSAGE_TEXT\": \"! - Number of spool requests entries: 30307 ; Configured threshold is: 20000.\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Messages"
  },
  {
    "type": "get",
    "url": "/GetTotCustMessages/:id",
    "title": "Messages totals for a customer",
    "name": "GetTotCustMessages",
    "group": "Messages",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetTotCustMessages/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "APPLICATION",
            "description": "<p>Name of the application being monitored and affected</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Name of the system impacted by alarm</p>"
          },
          {
            "group": "Success 200",
            "type": "String:Numer",
            "optional": false,
            "field": "CRITICAL:n",
            "description": "<p>Total number of critical alarmas</p>"
          },
          {
            "group": "Success 200",
            "type": "String:Numer",
            "optional": false,
            "field": "MAJOR:n",
            "description": "<p>Total number of major alarmas</p>"
          },
          {
            "group": "Success 200",
            "type": "String:Numer",
            "optional": false,
            "field": "MINOR:n",
            "description": "<p>Total number of minor alarmas</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "[\n    {\n        \"APPLICATION\": \"Linux\",\n        \"SYSTEMID\": \"bue-lx-ps1.bunge.ar\",\n        \"CRITICAL\": null,\n        \"MAJOR\": 1,\n        \"MINOR\": null\n    },\n    {\n        \"APPLICATION\": \"Oracle\",\n        \"SYSTEMID\": \"bue-lx-pbw.bunge.ar\",\n        \"CRITICAL\": 1,\n        \"MAJOR\": null,\n        \"MINOR\": null\n    }]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Messages"
  },
  {
    "group": "Metrics",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "Metrics",
    "name": ""
  },
  {
    "group": "Metrics",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "Metrics",
    "name": ""
  },
  {
    "group": "Nodes",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./app.js",
    "groupTitle": "Nodes",
    "name": ""
  },
  {
    "type": "get",
    "url": "/GetCustNodes/:id",
    "title": "Customer monitored node list",
    "name": "GetCustNodes",
    "group": "Nodes",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetCustNodes/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "[\n    {\n        \"SYSTEMID\": \"bue-lx-ps1.bunge.ar\"\n    },\n    {\n        \"SYSTEMID\": \"bue-lx-dev.bunge.ar\"\n    },\n    {\n        \"SYSTEMID\": \"bue-212-ptx.bunge.ar\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Nodes"
  },
  {
    "type": "get",
    "url": "/GetNodeCustCountry/:id",
    "title": "Node's country and siebel id",
    "name": "GetNodeCustomerCountry",
    "group": "Nodes",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetNodeCustCountry/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Node name</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SIEBELID",
            "description": "<p>Customer Siebel ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "COUNTRY",
            "description": "<p>Node country</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "[\n{\n\"SYSTEMID\":\"gbpsap.globant.ar\",\n\"SIEBELID\":\"1-3I6KN3\",\n\"COUNTRY\":\"Argentina\"}\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Nodes"
  },
  {
    "type": "get",
    "url": "/GetTopCpuNodes/:id/:days",
    "title": "Top 10 customer cpu comsumers for the last n days",
    "name": "GetTopCpuNodes",
    "group": "Performance_CPU",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetTopCpuNodes/:id/:days"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "days",
            "description": "<p>of days backwards to take for the measure</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "GBL_CPU_TOTAL_UTIL",
            "description": "<p>Cpu utilization percent</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "[\n  {\n    \"SYSTEMID\": \"bue-212-pbo.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 60.59\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-dpi.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 60.25\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qas.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 58.35\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-pbw.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 55.79\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dbo.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 49.46\n  },\n  {\n    \"SYSTEMID\": \"bue-212-qbo.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 47.230000000000004\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qas1.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 44.17\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-ps1.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 39.92\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-prd4n.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 35.46\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-prd3n.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 35.25\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_CPU"
  },
  {
    "type": "get",
    "url": "/GetTopCpuNodesLastMonth/:id",
    "title": "Top 10 customer cpu comsumers for the last month",
    "name": "GetTopCpuNodesLastMonth",
    "group": "Performance_CPU",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetTopCpuNodesLastMonth/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "GBL_CPU_TOTAL_UTIL",
            "description": "<p>Cpu utilization percent</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "[\n  {\n    \"SYSTEMID\": \"bue-212-pbo.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 60.59\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-dpi.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 60.25\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qas.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 58.35\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-pbw.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 55.79\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dbo.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 49.46\n  },\n  {\n    \"SYSTEMID\": \"bue-212-qbo.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 47.230000000000004\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qas1.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 44.17\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-ps1.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 39.92\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-prd4n.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 35.46\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-prd3n.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 35.25\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_CPU"
  },
  {
    "type": "get",
    "url": "/GetTopCpuNodesLastWeek/:id",
    "title": "Top 10 customer cpu comsumers for the last week",
    "name": "GetTopCpuNodesLastWeek",
    "group": "Performance_CPU",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetTopCpuNodesLastWeek/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "GBL_CPU_TOTAL_UTIL",
            "description": "<p>Cpu utilization percent</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "[\n  {\n    \"SYSTEMID\": \"bue-212-pbo.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 60.59\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-dpi.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 60.25\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qas.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 58.35\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-pbw.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 55.79\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dbo.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 49.46\n  },\n  {\n    \"SYSTEMID\": \"bue-212-qbo.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 47.230000000000004\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qas1.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 44.17\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-ps1.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 39.92\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-prd4n.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 35.46\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-prd3n.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 35.25\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_CPU"
  },
  {
    "type": "get",
    "url": "/GetTopCpuNodesYesterday/:id",
    "title": "Top 10 customer cpu comsumers for past day",
    "name": "GetTopCpuNodesYesterday",
    "group": "Performance_CPU",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetTopCpuNodesYesterday/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "GBL_CPU_TOTAL_UTIL",
            "description": "<p>Cpu utilization percent</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "[\n  {\n    \"SYSTEMID\": \"bue-212-pbo.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 60.59\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-dpi.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 60.25\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qas.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 58.35\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-pbw.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 55.79\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dbo.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 49.46\n  },\n  {\n    \"SYSTEMID\": \"bue-212-qbo.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 47.230000000000004\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qas1.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 44.17\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-ps1.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 39.92\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-prd4n.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 35.46\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-prd3n.bunge.ar\",\n    \"GBL_CPU_TOTAL_UTIL\": 35.25\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_CPU"
  },
  {
    "type": "get",
    "url": "/GetDownMinNodes/:id/:days",
    "title": "Down nodes for the last n days",
    "name": "GetDownMinNodes",
    "group": "Performance_Downtime",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetDownMinNodes/:id/:days"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "days",
            "description": "<p>of days backwards to take for the measure</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "SYSDOWNMINS",
            "description": "<p>Down minutes</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "[\n    {\n        \"SYSTEMID\": \"bue-lx-dbw.bunge.ar\",\n        \"SYSDOWNMINS\": 267\n    },\n    {\n        \"SYSTEMID\": \"bue-lx-qa4.bunge.ar\",\n        \"SYSDOWNMINS\": 23\n    },\n    {\n        \"SYSTEMID\": \"bue-ha-dev1.bunge.ar\",\n        \"SYSDOWNMINS\": 12\n    },\n    {\n        \"SYSTEMID\": \"bue-212-dbo.bunge.ar\",\n        \"SYSDOWNMINS\": 8\n    },\n    {\n        \"SYSTEMID\": \"bue-212-qbo.bunge.ar\",\n        \"SYSDOWNMINS\": 4\n    },\n    {\n        \"SYSTEMID\": \"bue-lx-qa6.bunge.ar\",\n        \"SYSDOWNMINS\": 3\n    },\n    {\n        \"SYSTEMID\": \"bue-lx-qpi.bunge.ar\",\n        \"SYSDOWNMINS\": 2\n    }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_Downtime"
  },
  {
    "type": "get",
    "url": "/GetDownMinNodesLastMonth/:id",
    "title": "Down nodes for the last month",
    "name": "GetDownMinNodesLastMonth",
    "group": "Performance_Downtime",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetDownMinNodesLastMonth/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "SYSDOWNMINS",
            "description": "<p>Down minutes</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": " [\n    {\n        \"SYSTEMID\": \"bue-lx-dbw.bunge.ar\",\n        \"SYSDOWNMINS\": 267\n    },\n    {\n        \"SYSTEMID\": \"bue-lx-qa4.bunge.ar\",\n        \"SYSDOWNMINS\": 23\n    },\n    {\n        \"SYSTEMID\": \"bue-ha-dev1.bunge.ar\",\n        \"SYSDOWNMINS\": 12\n    },\n    {\n        \"SYSTEMID\": \"bue-212-dbo.bunge.ar\",\n        \"SYSDOWNMINS\": 8\n    },\n    {\n        \"SYSTEMID\": \"bue-212-qbo.bunge.ar\",\n        \"SYSDOWNMINS\": 4\n    },\n    {\n        \"SYSTEMID\": \"bue-lx-qa6.bunge.ar\",\n        \"SYSDOWNMINS\": 3\n    },\n    {\n        \"SYSTEMID\": \"bue-lx-qpi.bunge.ar\",\n        \"SYSDOWNMINS\": 2\n    }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_Downtime"
  },
  {
    "type": "get",
    "url": "/GetDownMinNodesLastWeek/:id",
    "title": "Down nodes for the last month",
    "name": "GetDownMinNodesLastWeek",
    "group": "Performance_Downtime",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetDownMinNodesLastWeek/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "SYSDOWNMINS",
            "description": "<p>Down minutes</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": " [\n    {\n        \"SYSTEMID\": \"bue-lx-dbw.bunge.ar\",\n        \"SYSDOWNMINS\": 267\n    },\n    {\n        \"SYSTEMID\": \"bue-lx-qa4.bunge.ar\",\n        \"SYSDOWNMINS\": 23\n    },\n    {\n        \"SYSTEMID\": \"bue-ha-dev1.bunge.ar\",\n        \"SYSDOWNMINS\": 12\n    },\n    {\n        \"SYSTEMID\": \"bue-212-dbo.bunge.ar\",\n        \"SYSDOWNMINS\": 8\n    },\n    {\n        \"SYSTEMID\": \"bue-212-qbo.bunge.ar\",\n        \"SYSDOWNMINS\": 4\n    },\n    {\n        \"SYSTEMID\": \"bue-lx-qa6.bunge.ar\",\n        \"SYSDOWNMINS\": 3\n    },\n    {\n        \"SYSTEMID\": \"bue-lx-qpi.bunge.ar\",\n        \"SYSDOWNMINS\": 2\n    }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_Downtime"
  },
  {
    "type": "get",
    "url": "/GetDownMinNodesYesterday/:id",
    "title": "Down nodes for the past day",
    "name": "GetDownMinNodesYesterday",
    "group": "Performance_Downtime",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetDownMinNodesYesterday/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "SYSDOWNMINS",
            "description": "<p>Down minutes</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": " [\n    {\n        \"SYSTEMID\": \"bue-lx-dbw.bunge.ar\",\n        \"SYSDOWNMINS\": 267\n    },\n    {\n        \"SYSTEMID\": \"bue-lx-qa4.bunge.ar\",\n        \"SYSDOWNMINS\": 23\n    },\n    {\n        \"SYSTEMID\": \"bue-ha-dev1.bunge.ar\",\n        \"SYSDOWNMINS\": 12\n    },\n    {\n        \"SYSTEMID\": \"bue-212-dbo.bunge.ar\",\n        \"SYSDOWNMINS\": 8\n    },\n    {\n        \"SYSTEMID\": \"bue-212-qbo.bunge.ar\",\n        \"SYSDOWNMINS\": 4\n    },\n    {\n        \"SYSTEMID\": \"bue-lx-qa6.bunge.ar\",\n        \"SYSDOWNMINS\": 3\n    },\n    {\n        \"SYSTEMID\": \"bue-lx-qpi.bunge.ar\",\n        \"SYSDOWNMINS\": 2\n    }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_Downtime"
  },
  {
    "type": "get",
    "url": "/GetLastFSUtilNodes/:id",
    "title": "Customer last FS utilization measure",
    "name": "GetLastFSUtilNodes",
    "group": "Performance_FS",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetLastFSUtilNodes/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "FS_DIRNAME",
            "description": "<p>Dir or Filessyten name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "FS_SPACE_UTIL",
            "description": "<p>Space utilization percentage</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "FS_MAX_SIZE",
            "description": "<p>Filesystem size in megabytes</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "FS_SPACE_USED",
            "description": "<p>Amount of megabytes used</p>"
          },
          {
            "group": "Success 200",
            "type": "datetime",
            "optional": false,
            "field": "DATETIME",
            "description": "<p>Datetime for the measure</p>"
          },
          {
            "group": "Success 200",
            "type": "datetime",
            "optional": false,
            "field": "GMT",
            "description": "<p>Datetime for the measure in GMT</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "\n[\n {\n   \"SYSTEMNAME\": \"bue-212-dbo.bunge.ar\",\n   \"GMT\": \"2017-06-12T06:00:00.000Z\",\n   \"DATETIME\": \"2017-06-12T03:00:00.000Z\",\n   \"FS_DIRNAME\": \"D:\",\n   \"FS_MAX_SIZE\": 61438,\n   \"FS_SPACE_USED\": 56176,\n   \"FS_SPACE_UTIL\": 91.43\n },\n {\n   \"SYSTEMNAME\": \"bue-212-dbo.bunge.ar\",\n   \"GMT\": \"2017-06-12T06:00:00.000Z\",\n   \"DATETIME\": \"2017-06-12T03:00:00.000Z\",\n   \"FS_DIRNAME\": \"C:\",\n   \"FS_MAX_SIZE\": 122527,\n   \"FS_SPACE_USED\": 28913,\n   \"FS_SPACE_UTIL\": 23.59\n },\n {\n   \"SYSTEMNAME\": \"bue-212-dep.bunge.ar\",\n   \"GMT\": \"2017-06-12T06:00:00.000Z\",\n   \"DATETIME\": \"2017-06-12T03:00:00.000Z\",\n   \"FS_DIRNAME\": \"E:\",\n   \"FS_MAX_SIZE\": 327550,\n   \"FS_SPACE_USED\": 235390,\n   \"FS_SPACE_UTIL\": 71.86\n },\n {\n   \"SYSTEMNAME\": \"bue-212-dep.bunge.ar\",\n   \"GMT\": \"2017-06-12T06:00:00.000Z\",\n   \"DATETIME\": \"2017-06-12T03:00:00.000Z\",\n   \"FS_DIRNAME\": \"D:\",\n   \"FS_MAX_SIZE\": 102270,\n   \"FS_SPACE_USED\": 57832,\n   \"FS_SPACE_UTIL\": 56.54\n },\n {\n   \"SYSTEMNAME\": \"bue-212-dep.bunge.ar\",\n   \"GMT\": \"2017-06-12T06:00:00.000Z\",\n   \"DATETIME\": \"2017-06-12T03:00:00.000Z\",\n   \"FS_DIRNAME\": \"C:\",\n   \"FS_MAX_SIZE\": 122527,\n   \"FS_SPACE_USED\": 65763,\n   \"FS_SPACE_UTIL\": 53.660000000000004\n }\n ]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_FS"
  },
  {
    "type": "get",
    "url": "/GetNodeFSMetricsFromTo/:id/:date1/:date2",
    "title": "Node FS metrics between dates",
    "name": "GetNodeFSMetricsFromTo",
    "group": "Performance_FS",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetNodeFSMetricsFromTo/:id/:date1/:date2"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Parameter",
            "type": "Datetime",
            "optional": false,
            "field": "date1",
            "description": "<p>Datetime in format (yyyy-mm-dd HH-mm-ss) of the date from parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Datetime",
            "optional": false,
            "field": "date2",
            "description": "<p>Datetime in format (yyyy-mm-dd HH-mm-ss) of the date to parameter</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "FS_DIRNAME",
            "description": "<p>Dir or Filessyten name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "FS_SPACE_UTIL",
            "description": "<p>Space utilization percentage</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "FS_MAX_SIZE",
            "description": "<p>Filesystem size in megabytes</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "FS_SPACE_USED",
            "description": "<p>Amount of megabytes used</p>"
          },
          {
            "group": "Success 200",
            "type": "datetime",
            "optional": false,
            "field": "DATETIME",
            "description": "<p>Datetime for the measure</p>"
          },
          {
            "group": "Success 200",
            "type": "datetime",
            "optional": false,
            "field": "GMT",
            "description": "<p>Datetime for the measure in GMT</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "[\n  {\n    \"ID\": 267230851,\n    \"SYSTEMNAME\": \"ats-sg-app-01.rsi.ar\",\n    \"DATETIME\": \"2017-06-10T00:00:00.000Z\",\n    \"GMT\": \"2017-06-10T03:00:00.000Z\",\n    \"SHIFTNAME\": \"OFFSHIFT\",\n    \"FS_SPACE_USED\": 47720,\n    \"FS_MAX_SIZE\": 204697,\n    \"FS_DIRNAME\": \"C:\",\n    \"INTERVAL\": 3600,\n    \"FS_SPACE_UTIL\": 23.31\n  },\n  {\n    \"ID\": 267230875,\n    \"SYSTEMNAME\": \"ats-sg-app-01.rsi.ar\",\n    \"DATETIME\": \"2017-06-10T00:00:00.000Z\",\n    \"GMT\": \"2017-06-10T03:00:00.000Z\",\n    \"SHIFTNAME\": \"OFFSHIFT\",\n    \"FS_SPACE_USED\": 5778,\n    \"FS_MAX_SIZE\": 307197,\n    \"FS_DIRNAME\": \"E:\",\n    \"INTERVAL\": 3600,\n    \"FS_SPACE_UTIL\": 1.8800000000000001\n  },\n  {\n    \"ID\": 267230852,\n    \"SYSTEMNAME\": \"ats-sg-app-01.rsi.ar\",\n    \"DATETIME\": \"2017-06-10T01:00:00.000Z\",\n    \"GMT\": \"2017-06-10T04:00:00.000Z\",\n    \"SHIFTNAME\": \"OFFSHIFT\",\n    \"FS_SPACE_USED\": 47721,\n    \"FS_MAX_SIZE\": 204697,\n    \"FS_DIRNAME\": \"C:\",\n    \"INTERVAL\": 3600,\n    \"FS_SPACE_UTIL\": 23.31\n  },\n  {\n    \"ID\": 267230876,\n    \"SYSTEMNAME\": \"ats-sg-app-01.rsi.ar\",\n    \"DATETIME\": \"2017-06-10T01:00:00.000Z\",\n    \"GMT\": \"2017-06-10T04:00:00.000Z\",\n    \"SHIFTNAME\": \"OFFSHIFT\",\n    \"FS_SPACE_USED\": 5778,\n    \"FS_MAX_SIZE\": 307197,\n    \"FS_DIRNAME\": \"E:\",\n    \"INTERVAL\": 3600,\n    \"FS_SPACE_UTIL\": 1.8800000000000001\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_FS"
  },
  {
    "type": "get",
    "url": "/GetNodeGblMetricsFromTo/:id/:date1/:date2",
    "title": "Node global metrics between dates",
    "name": "GetNodeGblMetricFromTo",
    "group": "Performance_Global_Metrics",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetNodeGblMetricsFromTo/:id/:date1/:date2"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Parameter",
            "type": "Datetime",
            "optional": false,
            "field": "date1",
            "description": "<p>Datetime in format (yyyy-mm-dd HH-mm-ss) of the date from parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Datetime",
            "optional": false,
            "field": "date2",
            "description": "<p>Datetime in format (yyyy-mm-dd HH-mm-ss) of the date to parameter</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "GBL_MEM_UTIL",
            "description": "<p>Mem utilization</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "GBL_SWAP_SPACE_UTIL",
            "description": "<p>Swap space utilization</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "GBL_MEM_PAGEOUT_RATE",
            "description": "<p>Memory pageout rate</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "GBL_CPU_TOTAL_UTIL",
            "description": "<p>Cpu total utilization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "\n[\n  {\n    \"ID\": 109603006,\n    \"SYSTEMNAME\": \"bue-lx-prd1n.bunge.ar\",\n    \"DATETIME\": \"2017-05-01T15:00:00.000Z\",\n    \"GMT\": \"2017-05-01T18:00:00.000Z\",\n    \"SHIFTNAME\": \"OFFSHIFT\",\n    \"GBL_INTERVAL\": 1799,\n    \"GBL_SWAP_SPACE_UTIL\": 0,\n    \"GBL_CPU_TOTAL_UTIL\": 5.84,\n    \"INTERVAL\": 1799,\n    \"GBL_MEM_UTIL\": 39.01,\n    \"GBL_MEM_PAGEOUT_RATE\": 0,\n    \"GBL_DISK_PHYS_IO_RATE\": 139.5\n  },\n  {\n    \"ID\": 109603007,\n    \"SYSTEMNAME\": \"bue-lx-prd1n.bunge.ar\",\n    \"DATETIME\": \"2017-05-01T15:30:00.000Z\",\n    \"GMT\": \"2017-05-01T18:30:00.000Z\",\n    \"SHIFTNAME\": \"OFFSHIFT\",\n    \"GBL_INTERVAL\": 1800,\n    \"GBL_SWAP_SPACE_UTIL\": 0,\n    \"GBL_CPU_TOTAL_UTIL\": 5.25,\n    \"INTERVAL\": 1800,\n    \"GBL_MEM_UTIL\": 38.99,\n    \"GBL_MEM_PAGEOUT_RATE\": 0,\n    \"GBL_DISK_PHYS_IO_RATE\": 279.90000000000003\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_Global_Metrics"
  },
  {
    "type": "get",
    "url": "/GetTopMemUtilNodes/:id/:days",
    "title": "Top 10 customer mem comsumers for the last n days",
    "name": "GetTopMemUtilNodes",
    "group": "Performance_Mem",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetTopMemUtilNodes/:id/:days"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "days",
            "description": "<p>of days backwards to take for the measure</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "GBL_MEM_UTIL",
            "description": "<p>Mem utilization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "\n [\n  {\n    \"SYSTEMID\": \"bue-lx-ppi.bunge.ar\",\n    \"GBL_MEM_UTIL\": 70.43648305084744\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dbo.bunge.ar\",\n    \"GBL_MEM_UTIL\": 70.08471698113208\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-dpi.bunge.ar\",\n    \"GBL_MEM_UTIL\": 69.23348623853211\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qpi.bunge.ar\",\n    \"GBL_MEM_UTIL\": 67.74488505747125\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dep.bunge.ar\",\n    \"GBL_MEM_UTIL\": 67.7218410041841\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pbo.bunge.ar\",\n    \"GBL_MEM_UTIL\": 57.800956937799036\n  },\n  {\n    \"SYSTEMID\": \"bue-212-qbo.bunge.ar\",\n    \"GBL_MEM_UTIL\": 56.15379310344827\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-ps1.bunge.ar\",\n    \"GBL_MEM_UTIL\": 54.86592105263157\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pep.bunge.ar\",\n    \"GBL_MEM_UTIL\": 53.263691588785036\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qwd.bunge.ar\",\n    \"GBL_MEM_UTIL\": 47.02293333333333\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_Mem"
  },
  {
    "type": "get",
    "url": "/GetTopMemUtilNodesLastMonth/:id",
    "title": "Top 10 customer mem comsumers for the last month",
    "name": "GetTopMemUtilNodesLastMonth",
    "group": "Performance_Mem",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetTopMemUtilNodesLastMonth/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "GBL_MEM_UTIL",
            "description": "<p>Mem utilization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "\n [\n  {\n    \"SYSTEMID\": \"bue-lx-ppi.bunge.ar\",\n    \"GBL_MEM_UTIL\": 70.43648305084744\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dbo.bunge.ar\",\n    \"GBL_MEM_UTIL\": 70.08471698113208\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-dpi.bunge.ar\",\n    \"GBL_MEM_UTIL\": 69.23348623853211\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qpi.bunge.ar\",\n    \"GBL_MEM_UTIL\": 67.74488505747125\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dep.bunge.ar\",\n    \"GBL_MEM_UTIL\": 67.7218410041841\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pbo.bunge.ar\",\n    \"GBL_MEM_UTIL\": 57.800956937799036\n  },\n  {\n    \"SYSTEMID\": \"bue-212-qbo.bunge.ar\",\n    \"GBL_MEM_UTIL\": 56.15379310344827\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-ps1.bunge.ar\",\n    \"GBL_MEM_UTIL\": 54.86592105263157\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pep.bunge.ar\",\n    \"GBL_MEM_UTIL\": 53.263691588785036\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qwd.bunge.ar\",\n    \"GBL_MEM_UTIL\": 47.02293333333333\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_Mem"
  },
  {
    "type": "get",
    "url": "/GetTopMemUtilNodesLastWeek/:id",
    "title": "Top 10 customer mem comsumers for the last week",
    "name": "GetTopMemUtilNodesLastWeek",
    "group": "Performance_Mem",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetTopMemUtilNodesLastWeek/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "GBL_MEM_UTIL",
            "description": "<p>Mem utilization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "\n [\n  {\n    \"SYSTEMID\": \"bue-lx-ppi.bunge.ar\",\n    \"GBL_MEM_UTIL\": 70.43648305084744\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dbo.bunge.ar\",\n    \"GBL_MEM_UTIL\": 70.08471698113208\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-dpi.bunge.ar\",\n    \"GBL_MEM_UTIL\": 69.23348623853211\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qpi.bunge.ar\",\n    \"GBL_MEM_UTIL\": 67.74488505747125\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dep.bunge.ar\",\n    \"GBL_MEM_UTIL\": 67.7218410041841\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pbo.bunge.ar\",\n    \"GBL_MEM_UTIL\": 57.800956937799036\n  },\n  {\n    \"SYSTEMID\": \"bue-212-qbo.bunge.ar\",\n    \"GBL_MEM_UTIL\": 56.15379310344827\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-ps1.bunge.ar\",\n    \"GBL_MEM_UTIL\": 54.86592105263157\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pep.bunge.ar\",\n    \"GBL_MEM_UTIL\": 53.263691588785036\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qwd.bunge.ar\",\n    \"GBL_MEM_UTIL\": 47.02293333333333\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_Mem"
  },
  {
    "type": "get",
    "url": "/GetTopMemUtilNodesYesterday/:id",
    "title": "Top 10 customer mem comsumers for the past day",
    "name": "GetTopMemUtilNodesYesterday",
    "group": "Performance_Mem",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetTopMemUtilNodesYesterday/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "GBL_MEM_UTIL",
            "description": "<p>Mem utilization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "\n [\n  {\n    \"SYSTEMID\": \"bue-lx-ppi.bunge.ar\",\n    \"GBL_MEM_UTIL\": 70.43648305084744\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dbo.bunge.ar\",\n    \"GBL_MEM_UTIL\": 70.08471698113208\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-dpi.bunge.ar\",\n    \"GBL_MEM_UTIL\": 69.23348623853211\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qpi.bunge.ar\",\n    \"GBL_MEM_UTIL\": 67.74488505747125\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dep.bunge.ar\",\n    \"GBL_MEM_UTIL\": 67.7218410041841\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pbo.bunge.ar\",\n    \"GBL_MEM_UTIL\": 57.800956937799036\n  },\n  {\n    \"SYSTEMID\": \"bue-212-qbo.bunge.ar\",\n    \"GBL_MEM_UTIL\": 56.15379310344827\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-ps1.bunge.ar\",\n    \"GBL_MEM_UTIL\": 54.86592105263157\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pep.bunge.ar\",\n    \"GBL_MEM_UTIL\": 53.263691588785036\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qwd.bunge.ar\",\n    \"GBL_MEM_UTIL\": 47.02293333333333\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_Mem"
  },
  {
    "type": "get",
    "url": "/GetTopMemPageoutNodes/:id/:days",
    "title": "Top 10 customer mem pageout rate comsumers for the last n days",
    "name": "GetTopMemPageoutNodes",
    "group": "Performance_Mem_Pageout_Rate",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetTopMemPageoutNodes/:id/:days"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "days",
            "description": "<p>of days backwards to take for the measure</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "GBL_MEM_PAGEOUT_RATE",
            "description": "<p>Mem pageout rate</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "\n [\n  {\n    \"SYSTEMID\": \"bue-lx-pbw.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 90.866666666667\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-ppi.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 13.19705882352941\n  },\n  {\n    \"SYSTEMID\": \"bue-212-ptx.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 5.3\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pbo.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 4.62727272727273\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dep.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 4.50571428571429\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pep.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 4.34\n  },\n  {\n    \"SYSTEMID\": \"bue-212-qbo.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 3.484375\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dbo.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 3.4214285714285695\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-ps1.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 3.3714285714285697\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-dev.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 1.3090909090909097\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_Mem_Pageout_Rate"
  },
  {
    "type": "get",
    "url": "/GetTopMemPageoutNodesLastMonth/:id",
    "title": "Top 10 customer mem pageout rate comsumers for last month",
    "name": "GetTopMemPageoutNodesLastMonth",
    "group": "Performance_Mem_Pageout_Rate",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetTopMemPageoutNodesLastMonth/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "GBL_MEM_PAGEOUT_RATE",
            "description": "<p>Mem pageout rate</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "\n [\n  {\n    \"SYSTEMID\": \"bue-lx-pbw.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 90.866666666667\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-ppi.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 13.19705882352941\n  },\n  {\n    \"SYSTEMID\": \"bue-212-ptx.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 5.3\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pbo.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 4.62727272727273\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dep.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 4.50571428571429\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pep.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 4.34\n  },\n  {\n    \"SYSTEMID\": \"bue-212-qbo.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 3.484375\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dbo.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 3.4214285714285695\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-ps1.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 3.3714285714285697\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-dev.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 1.3090909090909097\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_Mem_Pageout_Rate"
  },
  {
    "type": "get",
    "url": "/GetTopMemPageoutNodesLastWeek/:id",
    "title": "Top 10 customer mem pageout rate comsumers for the last week",
    "name": "GetTopMemPageoutNodesLastWeek",
    "group": "Performance_Mem_Pageout_Rate",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetTopMemPageoutNodesLastWeek/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "GBL_MEM_PAGEOUT_RATE",
            "description": "<p>Mem pageout rate</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "\n [\n  {\n    \"SYSTEMID\": \"bue-lx-pbw.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 90.866666666667\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-ppi.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 13.19705882352941\n  },\n  {\n    \"SYSTEMID\": \"bue-212-ptx.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 5.3\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pbo.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 4.62727272727273\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dep.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 4.50571428571429\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pep.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 4.34\n  },\n  {\n    \"SYSTEMID\": \"bue-212-qbo.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 3.484375\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dbo.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 3.4214285714285695\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-ps1.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 3.3714285714285697\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-dev.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 1.3090909090909097\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_Mem_Pageout_Rate"
  },
  {
    "type": "get",
    "url": "/GetTopMemPageoutNodesLastWeek/:id",
    "title": "Top 10 customer mem pageout rate comsumers for the past day",
    "name": "GetTopMemPageoutNodesYesterday",
    "group": "Performance_Mem_Pageout_Rate",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetTopMemPageoutNodesYesterday/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "GBL_MEM_PAGEOUT_RATE",
            "description": "<p>Mem pageout rate</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "\n [\n  {\n    \"SYSTEMID\": \"bue-lx-pbw.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 90.866666666667\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-ppi.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 13.19705882352941\n  },\n  {\n    \"SYSTEMID\": \"bue-212-ptx.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 5.3\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pbo.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 4.62727272727273\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dep.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 4.50571428571429\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pep.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 4.34\n  },\n  {\n    \"SYSTEMID\": \"bue-212-qbo.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 3.484375\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dbo.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 3.4214285714285695\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-ps1.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 3.3714285714285697\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-dev.bunge.ar\",\n    \"GBL_MEM_PAGEOUT_RATE\": 1.3090909090909097\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_Mem_Pageout_Rate"
  },
  {
    "type": "get",
    "url": "/GetTopSwapUtilNodes/:id/:days",
    "title": "Top 10 customer swap comsumers for the last n days",
    "name": "GetTopSwapUtilNodes",
    "group": "Performance_Swap",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetTopSwapUtilNodes/:id/:days"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "days",
            "description": "<p>of days backwards to take for the measure</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "GBL_SWAP_SPACE_UTIL",
            "description": "<p>Mem utilization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "\n [\n  {\n    \"SYSTEMID\": \"bue-212-qbo.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 68.8315\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-pbw.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 58\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pbo.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 54.11136363636363\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dbo.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 53.322500000000005\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pep.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 42.7\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qbw.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 41\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dep.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 40.14615384615384\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-dev.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 26\n  },\n  {\n    \"SYSTEMID\": \"bue-212-ptx.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 22.47727272727272\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-prd3n.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 8\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_Swap"
  },
  {
    "type": "get",
    "url": "/GetTopSwapUtilNodesLastMonth/:id",
    "title": "Top 10 customer swap comsumers for the last month",
    "name": "GetTopSwapUtilNodesLastMonth",
    "group": "Performance_Swap",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetTopSwapUtilNodesLastMonth/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "GBL_SWAP_SPACE_UTIL",
            "description": "<p>Mem utilization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "\n [\n  {\n    \"SYSTEMID\": \"bue-212-qbo.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 68.8315\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-pbw.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 58\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pbo.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 54.11136363636363\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dbo.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 53.322500000000005\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pep.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 42.7\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qbw.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 41\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dep.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 40.14615384615384\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-dev.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 26\n  },\n  {\n    \"SYSTEMID\": \"bue-212-ptx.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 22.47727272727272\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-prd3n.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 8\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_Swap"
  },
  {
    "type": "get",
    "url": "/GetTopSwapUtilNodesLastWeek/:id",
    "title": "Top 10 customer swap comsumers for the last week",
    "name": "GetTopSwapUtilNodesLastWeek",
    "group": "Performance_Swap",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetTopSwapUtilNodesLastWeek/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "GBL_SWAP_SPACE_UTIL",
            "description": "<p>Mem utilization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "\n [\n  {\n    \"SYSTEMID\": \"bue-212-qbo.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 68.8315\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-pbw.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 58\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pbo.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 54.11136363636363\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dbo.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 53.322500000000005\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pep.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 42.7\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qbw.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 41\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dep.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 40.14615384615384\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-dev.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 26\n  },\n  {\n    \"SYSTEMID\": \"bue-212-ptx.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 22.47727272727272\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-prd3n.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 8\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_Swap"
  },
  {
    "type": "get",
    "url": "/GetTopSwapUtilNodesYesterday/:id",
    "title": "Top 10 customer swap comsumers for the past day",
    "name": "GetTopSwapUtilNodesYesterday",
    "group": "Performance_Swap",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetTopSwapUtilNodesYesterday/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Node name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "GBL_SWAP_SPACE_UTIL",
            "description": "<p>Mem utilization</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "\n [\n  {\n    \"SYSTEMID\": \"bue-212-qbo.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 68.8315\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-pbw.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 58\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pbo.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 54.11136363636363\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dbo.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 53.322500000000005\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pep.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 42.7\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qbw.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 41\n  },\n  {\n    \"SYSTEMID\": \"bue-212-dep.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 40.14615384615384\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-dev.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 26\n  },\n  {\n    \"SYSTEMID\": \"bue-212-ptx.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 22.47727272727272\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-prd3n.bunge.ar\",\n    \"GBL_SWAP_SPACE_UTIL\": 8\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Performance_Swap"
  },
  {
    "type": "get",
    "url": "/GetReports/:id",
    "title": "Available report list for a customer",
    "name": "GetReports",
    "group": "Reports",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetReports/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "path",
            "description": "<p>Pathname of the report.</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "size",
            "description": "<p>Size of file</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "[\n  {\n    \"path\": \"/app/reports/Apr-16/client_cpu_summary/1-CNK1/Client_CPU_summary.pdf\",\n    \"size\": 87604\n  },\n  {\n    \"path\": \"/app/reports/Apr-16/client_fs_high_use/1-CNK1/Client_FS_high_use.pdf\",\n    \"size\": 81037\n  },\n  {\n    \"path\": \"/app/reports/Apr-16/client_fs_less_use/1-CNK1/Client_FS_less_use.pdf\",\n    \"size\": 81494\n  },\n    \"path\": \"/app/reports/Dec-15/client_fs_high_use/1-CNK1/Client_FS_high_use.pdf\",\n    \"size\": 81089\n  },\n  {\n    \"path\": \"/app/reports/Dec-15/client_fs_less_use/1-CNK1/Client_FS_less_use.pdf\",\n    \"size\": 81428\n  },\n  {\n    \"path\": \"/app/reports/Dec-15/client_memory_summary/1-CNK1/Client_Memory_summary.pdf\",\n    \"size\": 87031\n  },\n  {\n    \"path\": \"/app/reports/Dec-15/client_uptime/1-CNK1/Client_Uptime.pdf\",\n  },\n  {\n    \"path\": \"/app/reports/Jan-17/client_cpu_summary/1-CNK1/Client_CPU_summary.pdf\",\n    \"size\": 88840\n  },\n  {\n    \"path\": \"/app/reports/Jan-17/client_fs_high_use/1-CNK1/Client_FS_high_use.pdf\",\n    \"size\": 80683\n  },\n  {\n    \"path\": \"/app/reports/Jan-17/client_fs_less_use/1-CNK1/Client_FS_less_use.pdf\",\n    \"size\": 81638\n  },\n  {\n    \"path\": \"/app/reports/Jan-17/client_memory_summary/1-CNK1/Client_Memory_summary.pdf\",\n  {\n    \"path\": \"/app/reports/Jun-16/client_cpu_summary/1-CNK1/Client_CPU_summary.pdf\",\n    \"size\": 88054\n  },\n  {\n    \"path\": \"/app/reports/Jun-16/client_fs_high_use/1-CNK1/Client_FS_high_use.pdf\",\n    \"size\": 80823\n  },\n  {\n    \"path\": \"/app/reports/Jun-16/client_fs_less_use/1-CNK1/Client_FS_less_use.pdf\",\n    \"size\": 81358\n  {\n    \"path\": \"/app/reports/May-16/client_fs_less_use/1-CNK1/Client_FS_less_use.pdf\",\n    \"size\": 81385\n  },\n  {\n    \"path\": \"/app/reports/May-16/client_memory_summary/1-CNK1/Client_Memory_summary.pdf\",\n    \"size\": 87071\n  },\n  {\n    \"path\": \"/app/reports/May-16/client_uptime/1-CNK1/Client_Uptime.pdf\",\n    \"size\": 90317\n  },\n  {\n    \"path\": \"/app/reports/Nov-15/client_cpu_summary/1-CNK1/Client_CPU_summary.pdf\",\n    \"size\": 87269\n  },\n  {\n    \"path\": \"/app/reports/Nov-15/client_fs_high_use/1-CNK1/Client_FS_high_use.pdf\",\n    \"size\": 80744\n  },\n  {\n    \"path\": \"/app/reports/Nov-15/client_fs_less_use/1-CNK1/Client_FS_less_use.pdf\",\n    \"size\": 81234\n  },\n  {\n    \"path\": \"/app/reports/Oct-15/client_memory_summary/1-CNK1/Client_Memory_summary.pdf\",\n    \"size\": 86559\n  },\n  {\n    \"path\": \"/app/reports/Oct-15/client_uptime/1-CNK1/Client_Uptime.pdf\",\n    \"size\": 90849\n  },\n  {\n    \"path\": \"/app/reports/Oct-16/client_cpu_summary/1-CNK1/Client_CPU_summary.pdf\",\n    \"size\": 88613\n  },\n  {\n    \"path\": \"/app/reports/Sep-16/client_uptime/1-CNK1/Client_Uptime.pdf\",\n    \"size\": 90559\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Reports"
  },
  {
    "type": "get",
    "url": "/GetNodesByStatus/:id",
    "title": "Nodes by status for a customer",
    "name": "GetNodesByStatus",
    "group": "Status",
    "sampleRequest": [
      {
        "url": "http://10.10.7.93:8000/GetNodesByStatus/:id"
      }
    ],
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Siebel ID (Master Account ID) for the customer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error connecting to DB</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>DB Read error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on error",
          "content": "{  \"status\": 404,\n  \"message\": \"DB Read error\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "SYSTEMID",
            "description": "<p>Name of the system impacted by alarm</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "STATUS",
            "description": "<p>Status of the node</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success",
          "content": "[\n  {\n    \"SYSTEMID\": \"bue-lx-de3.bunge.ar\",\n    \"STATUS\": \"NORMAL\"\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-dgr.bunge.ar\",\n    \"STATUS\": \"NORMAL\"\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qgr.bunge.ar\",\n    \"STATUS\": \"NORMAL\"\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-pwd.bunge.ar\",\n    \"STATUS\": \"NORMAL\"\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qa2.bunge.ar\",\n    \"STATUS\": \"NORMAL\"\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qwd.bunge.ar\",\n    \"STATUS\": \"NORMAL\"\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-dbw.bunge.ar\",\n    \"STATUS\": \"CRITICAL\"\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-pgr.bunge.ar\",\n    \"STATUS\": \"NORMAL\"\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-ps1.bunge.ar\",\n    \"STATUS\": \"NORMAL\"\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-prd1n.bunge.ar\",\n    \"STATUS\": \"MAJOR\"\n  },\n  {\n    \"SYSTEMID\": \"bue-lx-qa6.bunge.ar\",\n    \"STATUS\": \"MINOR\"\n  },\n  {\n    \"SYSTEMID\": \"bue-212-pep.bunge.ar\",\n    \"STATUS\": \"NORMAL\"\n  }\n  ]",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Status"
  }
] });
