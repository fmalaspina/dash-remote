
select REGEXP_REPLACE(c.name, '(^CTL\d\d)', '') AS SIEBELID, DECODE (f.node_group_name, 'DOC_Brasil', 'Brasil', 
                             'Venezuela', 'Venezuela', 
                             'Colombia', 'Colombia', 
                             'Chile', 'Chile',
                             'Peru','Peru',
                             'Argentina','Argentina',
                             'Ecuador','Ecuador',
                             'Network Argentina','Argentina',
                             'Network Chile','Chile',
                             'Network Colombia','Colombia',
                             'Network Ecuador','Ecuador',
                             'Network Peru','Peru',
                             'Network Venezuela','Venezuela',
                             'Arcos Network','Argentina',
                             'NOC_Brasil','Brasil',
                                'Group not found') AS COUNTRY
                                 from opc_nodes a 
             inner join opc_node_names d on a.node_id = d.node_id inner join opc_nodehier_layout b 
            on a.node_id = b.node_id inner join opc_nodehier_layout c on c.layout_id = b.parent_id 
            inner join opc_nodes_in_group e ON a.node_id = e.node_id 
            inner join opc_node_groups f ON e.node_group_id = f.node_group_id 
            where upper(d.node_name) like upper(:node_name) and f.node_group_name in ('Argentina'
,'DOC_Brasil','Venezuela','Colombia','Chile','Peru','Ecuador', 'Network Argentina', 
'Network Chile','Network Colombia','Network Ecuador','Network Peru','Network Venezuela',
'Arcos Network','NOC_Brasil')


union all


select REGEXP_REPLACE(c.name, '(^CTL\d\d)', '') AS SIEBELID, DECODE (f.node_group_name, 'DOC_Brasil', 'Brasil', 
                             'Venezuela', 'Venezuela', 
                             'Colombia', 'Colombia', 
                             'Chile', 'Chile',
                             'Peru','Peru',
                             'Argentina','Argentina',
                             'Ecuador','Ecuador',
                             'Network Argentina','Argentina',
                             'Network Chile','Chile',
                             'Network Colombia','Colombia',
                             'Network Ecuador','Ecuador',
                             'Network Peru','Peru',
                             'Network Venezuela','Venezuela',
                             'Arcos Network','Argentina',
                             'NOC_Brasil','Brasil',
                                'Group not found') AS COUNTRY
                                 from opc_nodes a 
             inner join opc_node_pattern d on a.node_id = d.pattern_id inner join opc_nodehier_layout b 
            on a.node_id = b.node_id inner join opc_nodehier_layout c on c.layout_id = b.parent_id 
            inner join opc_nodes_in_group e ON a.node_id = e.node_id 
            inner join opc_node_groups f ON e.node_group_id = f.node_group_id 
            where upper(d.pattern) like upper(:node_name) and f.node_group_name in ('Argentina'
,'DOC_Brasil','Venezuela','Colombia','Chile','Peru','Ecuador', 'Network Argentina', 
'Network Chile','Network Colombia','Network Ecuador','Network Peru','Network Venezuela',
'Arcos Network','NOC_Brasil')