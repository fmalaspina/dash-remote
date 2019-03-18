REM ***********************************************************************
REM File:        sel_msg.sql
REM Description: SQL*Plus report that displays the details of a selected
REM              message.
REM Language:    SQL*Plus
REM Package:     HP OpenView Operations for Unix
REM
REM (c) Copyright Hewlett-Packard Co. 1993 - 2004
REM ***********************************************************************

rem column text_part format A79 WORD_WRAPPED
rem column message_type format A60 WORD_WRAPPED
rem column instr_interf_call format A40 WORD_WRAPPED
rem column resolved_instr_par format A40 WORD_WRAPPED
rem column description format A34 WORD_WRAPPED
REM ---

column main_dupl format A5 wrapped
column main_date format A17 wrapped
column main_astatus format A9 wrapped
column main_opstatus format A9 wrapped
column main_severity format A8 wrapped
column main_msggrp format A40 wrapped
column main_node format A40 wrapped

column tmp_type format A11 wrapped
column tmp_name format A64 wrapped
column tmp_desc format A64 wrapped

column msg_text format A128 word_wrapped

column cma_name format A64 word_wrapped
column cma_value format A64 word_wrapped

column orig_text format A128 word_wrapped
column service_name format A128 word_wrapped

column ins_txt format A128 word_wrapped
column ii_name format A100 word_wrapped
column ii_call format A100 word_wrapped
column ii_par format A100 word_wrapped

column anno_txt format A128 word_wrapped


        set heading off
        set echo off
        set linesize 150 
        set pagesize 0
        set feedback off
        set newpage 0;
        Set Verify Off
        ttitle off;

select ' '  from dual;
select '                                   HPOM Report' from dual;
select '                                   -----------' from dual;
select ' '  from dual;
select 'Report Date: ',substr(TO_CHAR(SYSDATE,'DD-MON-YYYY'),1,20) from dual;
select ' '  from dual;
select 'Report Time: ',substr(TO_CHAR(SYSDATE,'HH24:MI:SS'),1,20) from dual;
select ' '  from dual;
select 'Report Definition:' from dual;
select '' from dual;
select '  User:          opc_adm' from dual;
select '  Report Name:   Selected Message ' from dual;
select '  Report Script: /etc/opt/OV/share/conf/OpC/mgmt_sv/reports/C/sel_msg.sql' from dual;
select ' '  from dual;
select ' '  from dual;

select 'Dup.  Date/Time         Auto St   Op In St  Sev.     Message Group                            Node Name' from dual;
select '----- ----------------- --------- --------- -------- ---------------------------------------- ----------------------------------------' from dual;

 select
	DECODE(m.dupl_count, 0, ' ', substr(TO_CHAR(dupl_count),1,5)) as main_dupl,
        substr(TO_CHAR(m.local_receiving_time,'MM/DD/YY HH24:MI:SS'),1,17) as main_date,
        DECODE(m.auto_status, 2, 'failed', 8, 'started',
               9, 'finished', 11, 'defined', 'undefined') as main_astatus,
        DECODE(m.op_init_status, 2, 'failed', 8, 'started',
               9, 'finished', 11, 'defined', 'undefined') as main_opstatus,
        DECODE(m.severity, 2, 'normal', 4, 'warning',
               8, 'critical', 16, 'minor', 32, 'major', '?') as main_severity,
        m.message_group as main_msggrp,
        nn.node_name as main_node
  from
        opc_act_messages m,
        opc_node_names   nn
  where
        m.message_number = '&1'  
   and
        m.node_id        =  nn.node_id
 union
 select
	DECODE(m.dupl_count, 0, ' ', substr(TO_CHAR(dupl_count),1,5)) as main_dupl,
        substr(TO_CHAR(m.local_receiving_time,'MM/DD/YY HH24:MI:SS'),1,17) as main_date,
        DECODE(m.auto_status, 2, 'failed', 8, 'started',
               9, 'finished', 11, 'defined', 'undefined') as main_astatus,
        DECODE(m.op_init_status, 2, 'failed', 8, 'started',
               9, 'finished', 11, 'defined', 'undefined') as main_opstatus,
        DECODE(m.severity, 2, 'normal', 4, 'warning',
               8, 'critical', 16, 'minor', 32, 'major', '?') as main_severity,
        m.message_group as main_msggrp,
        nn.node_name as main_node
  from
        opc_hist_messages m,
        opc_node_names   nn
  where
        m.message_number = '&1'  
   and
        m.node_id        =  nn.node_id;

select ' '  from dual;
select 'Source Type Template Name                                                   ' from dual; 
select '----------- ----------------------------------------------------------------' from dual;
select
        DECODE(st.msg_source_type, 1, 'Console    ', 2, 'Message',
               4, 'Logfile', 8, 'Monitor', 16, 'SnmpTrap',
               32, 'ECS', 256, 'Schedule', 512, 'Adv. Monitor', 1024, 'WBEM', 2048, 'Win.Evt.Log',
               8192, 'Serv. Dist.',16384, 'Node Info', 32768, 'Mgr. Conf.', 65536, 'Config File',
               69632, 'Subagent', 4096, 'Internal',
               (select policy_type_name from opc_policy_type where policy_type_num=st.msg_source_type)
              ) as tmp_type,
        msg_source_name as tmp_name
  from
        opc_act_messages st
  where
        st.message_number = '&1';
select
        DECODE(st.msg_source_type, 1, 'Console    ', 2, 'Message',
               4, 'Logfile', 8, 'Monitor', 16, 'SnmpTrap',
               32, 'ECS', 256, 'Schedule', 512, 'Adv. Monitor', 1024, 'WBEM', 2048, 'Win.Evt.Log',
               8192, 'Serv. Dist.',16384, 'Node Info', 32768, 'Mgr. Conf.', 65536, 'Config File',
               69632, 'Subagent', 4096, 'Internal',
               (select policy_type_name from opc_policy_type where policy_type_num=st.msg_source_type)
              ) as tmp_type,
        msg_source_name as tmp_name
  from
        opc_hist_messages st
  where
        st.message_number = '&1';

select ' '  from dual;
select 'Message Text '  from dual;
select '------------ '  from dual;

select
        mt.text_part as msg_text
  from
        opc_msg_text mt
  where
        mt.message_number = '&1'  
  order by order_number;

select
        mt.text_part as msg_text
  from
        opc_hist_msg_text mt
  where
        mt.message_number = '&1'  
  order by order_number;

select ' '  from dual;
select 'Custom Message Attributes '  from dual;
select '------------------------- '  from dual;

select
        cma.cma_name,
	cma.cma_value
  from
        opc_act_cust_attrib cma
  where
        cma.message_number = '&1'  
  order by cma_name;

select
        cma.cma_name,
	cma.cma_value
  from
        opc_hist_cust_attrib cma
  where
        cma.message_number = '&1'  
  order by cma_name;

select ' '  from dual;
select 'Original Text '  from dual;
select '------------- '  from dual;
select  omt.text_part as orig_text
  from
        opc_orig_msg_text omt
  where
        omt.message_number ='&1'
  order by order_number;

select  omt.text_part as orig_text
  from
        opc_hist_orig_text omt
  where
        omt.message_number ='&1'
  order by order_number;

select ' '  from dual;
select 'Service Name ' from dual;
select '------------ ' from dual;
select
        sn.service_name 
  from
        opc_act_messages sn
  where
        sn.message_number = '&1';

select
        sn.service_name 
  from
        opc_hist_messages sn
  where
        sn.message_number = '&1';

select ' '  from dual;
select 'Last Time Received (Dupl.) ' from dual;
select '-------------------------- ' from dual;
select
        TO_CHAR(lr.local_last_time_received,'MM/DD/YY HH24:MI:SS')
  from
        opc_act_messages lr
  where
        lr.message_number = '&1';

select
        TO_CHAR(lr.local_last_time_received,'MM/DD/YY HH24:MI:SS')
  from
        opc_hist_messages lr
  where
        lr.message_number = '&1';

select ' '  from dual;
select 'Instruction '  from dual;
select '----------- '  from dual;
select
        it.text_part as ins_txt
  from
        opc_act_messages m,
        opc_instructions it
  where
        m.message_number = '&1'
    and
        m.instruction_type = 1
    and
        m.instruction_id = it.instruction_id
  order by order_number;

select
        it.text_part as ins_txt
  from
        opc_hist_messages m,
        opc_instructions it
  where
        m.message_number = '&1'
    and
        m.instruction_type = 1
    and
        m.instruction_id = it.instruction_id
  order by order_number;

 select 'Instruction Interface Name      :',
        m.instruction_id as ii_name,
        'Instruction Interface Call      :',
        if.instr_interf_call as ii_call,
        'Instruction Interface Parameters:',
        m.resolved_instr_par as ii_par
  from
        opc_act_messages m,
        opc_instr_interf if
  where
        m.message_number = '&1'
    and
        m.instruction_type = 2
    and
        m.instruction_id = if.name
 union
 select 'Instruction Interface Name      :',
        m.instruction_id as ii_name,
        'Instruction Interface Call      :',
        if.instr_interf_call as ii_call,
        'Instruction Interface Parameters:',
        m.resolved_instr_par as ii_par
  from
        opc_hist_messages m,
        opc_instr_interf if
  where
        m.message_number = '&1'
    and
        m.instruction_type = 2
    and
        m.instruction_id = if.name;

select ' '  from dual;
select 'Annotations ' from dual;
select '----------- ' from dual;
select
        atx.text_part as anno_txt
  from
        opc_annotation   an,
        opc_anno_text    atx
  where
        an.message_number = '&1'
    and
        an.anno_text_id = atx.anno_text_id
  order by anno_number, order_number;
select
        atx.text_part as anno_txt
  from
        opc_hist_annotation   an,
        opc_hist_anno_text    atx
  where
        an.message_number = '&1'
    and
        an.anno_text_id = atx.anno_text_id
  order by anno_number, order_number;

select ' '  from dual
