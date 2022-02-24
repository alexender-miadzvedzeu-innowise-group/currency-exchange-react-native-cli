export const renderDinoText = (string: string, dinoValues: {[ key:string ]: string | null}): string =>
  string.split(' ').map(el => {
    const match = Object.keys(dinoValues).some(key => {
      return `{${key}}` === el;
    })
    if (match) {
      const key = el.substring(1, el.length - 1);
      const value = dinoValues[key];
      return value;
    } return el;
  }).join(' ');