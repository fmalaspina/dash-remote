select SYSTEMID, CASE when CRITICAL IS NOT NULL then 'CRITICAL' when MAJOR IS NOT NULL then 'MAJOR' when MINOR IS NOT NULL then 'MINOR' when NORMAL IS NOT NULL then 'NORMAL' end STATUS from (select * from (SELECT case when a.SEVERITY = 8 then 'CRITICAL' when a.SEVERITY = 32 then 'MAJOR'  when a.SEVERITY = 16 then 'MINOR'  end 
                AS severity, b.node_name AS systemid,count(*) AS alarms
                FROM OPC_ACT_MESSAGES a 
                inner join (select d.node_name as node_name, d.node_id as node_id from opc_nodes a
                inner join opc_node_names d on a.node_id = d.node_id inner join opc_nodehier_layout b 
                on a.node_id = b.node_id inner join opc_nodehier_layout c on c.layout_id = b.parent_id
                where c.name = :siebelid) b on b.node_id = a.node_id 
                WHERE TRIM(a.MESSAGE_GROUP) IN ('OS','Database','Hardware','Service','SAP') 
                AND a.SEVERITY IN (8,16,32) GROUP BY a.SEVERITY, b.NODE_NAME
                
                union
                
select 'NORMAL' severity, d.node_name as systemid, 1 alarms from opc_nodes a
                inner join opc_node_names d on a.node_id = d.node_id inner join opc_nodehier_layout b 
                on a.node_id = b.node_id inner join opc_nodehier_layout c on c.layout_id = b.parent_id
                where c.name = :siebelid
                )
                pivot (SUM(alarms) for severity 
                in ('CRITICAL' AS CRITICAL,'MAJOR' AS MAJOR,'MINOR' AS MINOR, 'NORMAL' AS NORMAL)) )        
