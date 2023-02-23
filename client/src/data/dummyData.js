// 질문 조회
export const questionData = {
  questionId: 1,
  userId: 1,
  userName: 'HYLIM',
  title: 'How do I merge two dictionaries in a single expression in Python?',
  content: 'I want to merge two dictionaries into a new dictionary.',
  viewCount: 1,
  voteCount: 1038,
  tags: ['JavaScript', 'Python', 'Java', 'React', 'VSCode'],
  createdAt: '2023-02-23T17:20:17',
  modifiedAt: '2023-02-23T17:37:39.65594'
};

// 질문 댓글 조회
export const questionCommentData = [
  {
    questionCommentId: 1,
    userId: 1,
    userName: 'helloitsme',
    questionId: 1,
    content: 'question - test',
    createdAt: '2023-04-03T03:03:00',
    modifiedAt: '2023-04-03T03:03:00'
  },
  {
    questionCommentId: 2,
    userId: 2,
    userName: 'hihihi!',
    questionId: 1,
    content: 'question - test',
    createdAt: '2023-04-03T03:03:00',
    modifiedAt: '2023-04-03T03:03:00'
  }
];

// 답변 조회
export const answerData = [
  {
    answerId: 1,
    content: 'answer1 - test',
    userId: 1,
    userName: 'Tom',
    questionId: 1,
    voteCount: 123,
    createdAt: '2023-04-03T03:03:00',
    modifiedAt: '2023-04-03T03:03:00'
  },
  {
    answerId: 2,
    content: 'answer2 - test',
    userId: 2,
    userName: 'ABCD',
    questionId: 1,
    voteCount: 17,
    createdAt: '2023-04-03T03:03:00',
    modifiedAt: '2023-04-03T03:03:00'
  }
];

// 답변-1의 댓글 조회
export const answerCommentData1 = [
  {
    answerCommentId: 1,
    answerId: 1,
    content:
      'Can you share source for that?! Even if that sounds legit, it would be good to back these claims by actual code',
    userId: 1,
    userName: 'Sammy',
    questionId: 1,
    createdAt: '2023-04-03T03:03:00',
    modifiedAt: '2023-04-03T03:03:00'
  },
  {
    answerCommentId: 2,
    answerId: 1,
    content: 'test',
    userId: 2,
    userName: 'HELLOO',
    questionId: 1,
    createdAt: '2023-04-03T03:03:00',
    modifiedAt: '2023-04-03T03:03:00'
  }
];

export const answerCommentData2 = [
  {
    answerCommentId: 1,
    answerId: 1,
    content: 'twotwotwotwotwotwotwotwotwotwotwotwotwotwo',
    userId: 1,
    userName: 'twotwo',
    questionId: 1,
    createdAt: '2023-04-03T03:03:00',
    modifiedAt: '2023-04-03T03:03:00'
  },
  {
    answerCommentId: 2,
    answerId: 1,
    content: 'test222',
    userId: 2,
    userName: '22222',
    questionId: 1,
    createdAt: '2023-04-03T03:03:00',
    modifiedAt: '2023-04-03T03:03:00'
  }
];
