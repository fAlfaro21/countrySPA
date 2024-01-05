import { Country } from "./country";
import { Region } from "./region.type";

export interface CacheStore{
  byCapital:   TermCountries;
  byCountries: TermCountries;
  byRegion:    RegionCountries;
}

export interface TermCountries{
    term: string;
    countries: Country[];
}

export interface RegionCountries{
  //region va opcional porque cuando accedes a la opción, no hay regiones seleccionadas aún
    region: Region;
    countries: Country[];
}

