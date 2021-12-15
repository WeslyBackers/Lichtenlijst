import sys

# install pyshp with "pip install pyshp"
import shapefile

#get examples of shapefiles from https://www.diva-gis.org/datadown
sf = shapefile.Reader("F:\Werk\Lichtenlijst\Data\BEL_water_lines_dcw.shp")

#get data from the shapefile in records, fields and objecttypes
records=sf.records()
fields=sf.fields
types = sf.shapeType

#print results
print(fields)
print(types)
print(records)