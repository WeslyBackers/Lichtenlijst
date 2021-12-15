import sys
import shapefile

sf = shapefile.Reader("F:\Werk\Lichtenlijst\Data\BEL_water_lines_dcw.shp")

records=sf.records()
fields=sf.fields
types = sf.shapeType

print(fields)
print(types)
print(records)