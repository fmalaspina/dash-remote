select SYSTEMNAME AS SYSTEMID, SYSDOWNMINS from ( 
        select SYSTEMNAME, SUM(SYSDOWNMINS) AS SYSDOWNMINS from (
          select DISTINCT a.SYSTEMNAME,a.SYSDOWNMINS from SYSDOWNTIME a where a.SYSTEMNAME IN 
                (select SYSTEMID from GROUPS where GROUPNAME = :siebelid) and a.GMT between 
                add_months(trunc(sysdate,'mm'),-1) and last_day(add_months(trunc(sysdate,'mm'),-1)))
         GROUP BY SYSTEMNAME) where SYSDOWNMINS > 0 ORDER BY SYSDOWNMINS DESC 

