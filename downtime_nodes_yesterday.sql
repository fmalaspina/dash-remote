select SYSTEMNAME AS SYSTEMID, SYSDOWNMINS from ( 
        select SYSTEMNAME, SUM(SYSDOWNMINS) AS SYSDOWNMINS from (
          select DISTINCT a.SYSTEMNAME,a.SYSDOWNMINS from SYSDOWNTIME a where a.SYSTEMNAME IN 
                (select SYSTEMID from GROUPS where GROUPNAME = :siebelid) and a.datetime >= to_char(current_date - numtodsinterval(1,'day')))
         GROUP BY SYSTEMNAME) where SYSDOWNMINS > 0 ORDER BY SYSDOWNMINS DESC
     
