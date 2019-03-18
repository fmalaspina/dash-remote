select * from (
        select SYSTEMNAME AS SYSTEMID, GBL_MEM_PAGEOUT_RATE from ( 
        select SYSTEMNAME, AVG(GBL_MEM_PAGEOUT_RATE) AS GBL_MEM_PAGEOUT_RATE from (
          select DISTINCT a.SYSTEMNAME,a.GBL_MEM_PAGEOUT_RATE from L3_GLOBAL a where a.SYSTEMNAME IN 
                (select SYSTEMID from GROUPS where GROUPNAME = :siebelid) and a.DATETIME >= (sysdate - :days)
        ) GROUP BY SYSTEMNAME) ORDER BY GBL_MEM_PAGEOUT_RATE DESC)
     where ROWNUM <= 10
     