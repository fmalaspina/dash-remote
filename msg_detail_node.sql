

 select
	DECODE(m.dupl_count, 0, ' ', substr(TO_CHAR(dupl_count),1,5)) as DUPLICATES,
        substr(TO_CHAR(m.local_receiving_time,'MM/DD/YY HH24:MI:SS'),1,17) as DATETIME,
        DECODE(m.severity, 2, 'normal', 4, 'warning',
               8, 'critical', 16, 'minor', 32, 'major', '?') as SEVERITY,
        m.message_group as MESSAGE_GROUP,
        CASE WHEN m.APPLICATION = 'HP SiteScope' THEN 'Reachability' ELSE m.APPLICATION END AS APPLICATION,
        m.object,
        nn.node_name as SYSTEMID, 
        CONCAT(LISTAGG(mt.text_part,' ') WITHIN group (order by mt.message_number,mt.order_number),CONCAT(' REF.: ',
        (select DISTINCT ant.text_part from opc_anno_text ant inner join opc_annotation ann on ant.anno_text_id = ann.anno_text_id 
        where ann.message_number = m.message_number and ant.text_part like 'SM-%' and rownum = 1))) MESSAGE_TEXT,
        (select DISTINCT ant.text_part from opc_anno_text ant inner join opc_annotation ann on ant.anno_text_id = ann.anno_text_id 
        where ann.message_number = m.message_number and ant.text_part like 'SM-%' and rownum = 1) TICKET
from
        opc_act_messages m inner join opc_node_names nn on m.node_id = nn.node_id left outer join opc_msg_text mt on mt.message_number = m.message_number 
where nn.node_name = :id and TRIM(m.MESSAGE_GROUP) IN ('OS','Database','Hardware','Service','SAP') and m.severity IN (8,16,32)
group by m.dupl_count,m.local_receiving_time,m.severity,m.message_group,m.application,m.object,nn.node_name,m.message_number
order by m.dupl_count,m.local_receiving_time,m.severity,m.message_group,m.application,m.object,nn.node_name,m.message_number
 




