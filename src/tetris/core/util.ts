/**
 * @reference
 *  https://www.nxworld.net/js-array-shuffle.html
 * @param param0 
 * @returns 
 */
export const shuffleByFisherYates = (data: Readonly<any[]>) => {
    const array  = [...data]
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  