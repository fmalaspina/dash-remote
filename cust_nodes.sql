   select d.node_name as SYSTEMID from opc_nodes a 
             inner join opc_node_names d on a.node_id = d.node_id inner join opc_nodehier_layout b 
            on a.node_id = b.node_id inner join opc_nodehier_layout c on c.layout_id = b.parent_id 
            where c.name = :siebelid
                