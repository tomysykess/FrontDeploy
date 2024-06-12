export const getColorClass = (category: string): string => {
    if (category === 'Vino') {
        return 'border-t-wine'; 
    } else if (category === 'Gin') {
        return 'border-t-gin'; 
    } else if (category === 'Whisky'){
        return 'border-t-whisky'; 
    }  else if (category === 'Vodka'){
        return 'border-t-blue-500 border-opacity-50'; 
    } else if (category === 'Ron'){
        return 'border-t-ron border-opacity-50'; 
      }  else if (category === 'Tequila'){
        return 'border-t-tequila border-opacity-50'; 
      } 
    return '';
};




