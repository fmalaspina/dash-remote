SELECT OPC_NODE_NAMES.NODE_NAME AS SYSTEMID, (to_char(mod(trunc(OPC_NODE_NAMES.IP_ADDRESS/256/256/256),256)) || '.' || to_char(mod(trunc(OPC_NODE_NAMES.IP_ADDRESS/256/256),256)) || '.' || to_char(mod(trunc(OPC_NODE_NAMES.IP_ADDRESS/256),256)) || '.' || to_char(mod(OPC_NODE_NAMES.IP_ADDRESS,256))) AS IP,OPC_NODE_GROUPS.NODE_GROUP_NAME AS NODEGROUP FROM OPC_NODES INNER JOIN OPC_NODE_NAMES ON OPC_NODES.NODE_ID = OPC_NODE_NAMES.NODE_ID INNER JOIN OPC_NODES_IN_GROUP ON OPC_NODES.NODE_ID = OPC_NODES_IN_GROUP.NODE_ID INNER JOIN OPC_NODE_GROUPS ON OPC_NODES_IN_GROUP.NODE_GROUP_ID = OPC_NODE_GROUPS.NODE_GROUP_ID WHERE OPC_NODES.IS_VIRTUAL != 1 AND OPC_NODES.NODE_TYPE IN (2,3) AND OPC_NODE_GROUPS.NODE_GROUP_NAME = 'SAP_LATAM'