declare module 'country-telephone-data' {
  const allCountriesData: {
    allCountries: Array<{
      name: string;
      dialCode: string;
    }>;
  };

  export default allCountriesData;
}
