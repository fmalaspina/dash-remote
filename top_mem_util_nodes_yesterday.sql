select * from (
        select SYSTEMNAME AS SYSTEMID, GBL_MEM_UTIL from ( 
        select SYSTEMNAME, AVG(GBL_MEM_UTIL) AS GBL_MEM_UTIL from (
          select DISTINCT a.SYSTEMNAME,a.GBL_MEM_UTIL from L3_GLOBAL a where a.SYSTEMNAME IN 
                (select SYSTEMID from GROUPS where GROUPNAME = :siebelid) and a.datetime >= to_char(current_date - numtodsinterval(1,'day')))
         GROUP BY SYSTEMNAME) ORDER BY GBL_MEM_UTIL DESC)
     where ROWNUM <= 10