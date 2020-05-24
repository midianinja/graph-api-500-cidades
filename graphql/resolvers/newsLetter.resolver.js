import NewsLetterController from '../../controllers/news-letter/newsLetter.controller';

export default {
  queries: {
    allNewsLetters: NewsLetterController.findAll,
  },
  mutations: {
    createNewsLetter: NewsLetterController.create,
  },
};
