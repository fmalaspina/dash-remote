select REGEXP_REPLACE(c.name, '(^CTL\d\d)', '') AS SIEBELID, c.label AS NAME 
                                 from opc_nodehier_layout c 
group by c.name,c.label