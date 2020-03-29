import userType from './user.type';
import addressType from './address.type';
import paginatorType from './paginator.type';
import imageType from './image.type';


export default `
  scalar JSON
  
  ${userType}
  ${imageType}
  ${addressType}
  
  ${paginatorType}
`;
