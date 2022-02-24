const getMyIPv4 = async () => {
  try {
    const response = await fetch('https://geolocation-db.com/json/');
    const request = await response.json();
    const { IPv4 } = request;
    return IPv4;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getLocalCountry = async (): Promise<{ country_code:string, currency_code:string, country: string }> => {
  try {
    const IPv4 = await getMyIPv4();
    const response = await fetch(`http://ipwhois.app/json/${IPv4}`);
    const request = await response.json();
    const { country_code, currency_code, country } = request;
    return { country_code, currency_code, country };
  } catch (error) {
    console.log(error);
    return { country_code: '', currency_code: '', country: '' }; 
  }
}