// 질문 조회
export const questionData = {
  questionId: 1,
  userId: 1,
  userName: 'HYLIM',
  title: '제목 아님',
  content: '내용',
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

// 답변 댓글 조회
export const answerCommentData = [
  {
    answerCommentId: 1,
    answerId: 1,
    content: 'test',
    userId: 1,
    questionId: 1,
    createdAt: '2023-04-03T03:03:00',
    modifiedAt: '2023-04-03T03:03:00'
  }
];
