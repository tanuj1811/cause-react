export const Queries = [
  {
    _id: 'q01mzpb01',
    userId: 'ccqh01 ',
    comments: [],
    answers: [],
    tags: ['query', 'programming', 'engineering', 'project'],
    groups: ['cause.com'],
    title: 'hello world',
    description: 'bye world',
    date: '25/01/2021',
  },
  {
    _id: 'q01mzpb01',
    comments: [],
    answers: [],
    tags: ['query', 'programming', 'engineering', 'project'],
    groups: ['cause.com'],
    userId: 'ccqh02 ',
    title: 'hello world',
    description: 'bye world',
    date: '25/01/2021',
  },
  {
    _id: 'q01mzpb01',
    comments: [],
    answers: [],
    tags: ['query', 'programming', 'engineering', 'project'],
    groups: ['cause.com'],
    userId: 'ccqh03 ',
    title: 'hello world',
    description: 'bye world',
    date: '25/01/2021',
  },
  {
    _id: 'q01mzpb01org',
    userId: 'queryhub1',
    comments: [],
    answers: [],
    tags: ['query', 'programming', 'engineering', 'project'],
    groups: ['cause.com'],
    title:
      'Error -- >Caused by: java.lang.IllegalArgumentException: Iteration variable cannot be null',
    description:
      '<h5>ackage com.star.entity; import java.time.LocalDate; import javax.persistence.Column; import javax.persistence.Entity;</h5>' +
      '<code>import javax.persistence.GeneratedValue;' +
      'import javax.persistence.GenerationType;' +
      'import javax.persistence.Id;' +
      'import javax.persistence.ManyToOne;' +
      'import javax.persistence.Table;' +
      'import javax.validation.constraints.NotBlank;</code>',

    date: '25/01/2021',
  },
  {
    _id: 'q01mzpb01org',
    userId: 'queryhub2',
    comments: [],
    answers: [],
    tags: ['query', 'programming', 'engineering', 'project'],
    groups: ['cause.com'],
    title:
      'Caused by: java.lang.IllegalArgumentException: Iteration variable cannot be null',
    description:
      'ackage com.star.entity; import java.time.LocalDate; import javax.persistence.Column; import javax.persistence.Entity;' +
      'import javax.persistence.GeneratedValue;' +
      'import javax.persistence.GenerationType;' +
      'import javax.persistence.Id;' +
      'import javax.persistence.ManyToOne;' +
      'import javax.persistence.Table;' +
      'import javax.validation.constraints.NotBlank;',

    date: '25/01/2021',
  },
  {
    _id: 'q01mzpb01org',
    userId: 'queryhub3',
    comments: [],
    answers: [],
    tags: ['query', 'programming', 'engineering', 'project'],
    groups: ['cause.com'],
    title:
      'Caused by: java.lang.IllegalArgumentException: Iteration variable cannot be null',
    description:
      'ackage com.star.entity; import java.time.LocalDate; import javax.persistence.Column; import javax.persistence.Entity;' +
      'import javax.persistence.GeneratedValue;' +
      'import javax.persistence.GenerationType;' +
      'import javax.persistence.Id;' +
      'import javax.persistence.ManyToOne;' +
      'import javax.persistence.Table;' +
      'import javax.validation.constraints.NotBlank;',

    date: '25/01/2021',
  },
  {
    _id: 'q01mzpb01',
    userId: 'ccqh07 ',
    comments: [],
    answers: [],
    tags: ['query', 'programming', 'engineering', 'project'],
    groups: ['cause.com'],
    title: 'hello world',
    description: 'bye world',
    date: '25/01/2021',
  },
]

export const Answers = [
  {
    _id: 'ccqha0n0s001',
    answer:
      'package com.star.entity; import java.time.LocalDate; import javax.persistence.Column; import javax.persistence.Entity;' +
      'import javax.persistence.GeneratedValue;' +
      'import javax.persistence.GenerationType;' +
      'import javax.persistence.Id;' +
      'import javax.persistence.ManyToOne;' +
      'import javax.persistence.Table;' +
      'import javax.validation.constraints.NotBlank;',
    userId: 'ccqh06',
    date: '25/01/1995',
    queryId: 'q01mzpb01org',
    approved: false,
    score: 0,
  },
  {
    _id: 'ccqha0n0s002',
    answer: 'Best Answer for all queries',
    userId: 'queryhub1',
    date: '25/01/2021',
    queryId: 'q01mzpb01org',
    approved: true,
    score: 99,
  },
]

export const Comments = [
  {
    _id: 'ccqh0c0o0m001',
    content: 'This is comment',
    userId: 'queryhub1',
    queryId: 'q01mzpb01org',
  },
  {
    _id: 'ccqh0c0o0m001',
    content: 'This is sfdafdfgdfgcomment',
    userId: 'queryhub1',
    queryId: 'q01mzpb01org',
  },
  {
    _id: 'ccqh0c0o0m001',
    content: 'This iafdafdas comment',
    userId: 'queryhub1',
    queryId: 'q01mzpb01org',
  },
  {
    _id: 'ccqh0c0o0m001',
    content: 'This sdfasdfa comment',
    userId: 'queryhub1',
    queryId: 'q01mzpb01org',
  },

  {
    _id: 'ccqh0c0o0m001',
    content:
      'The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link',
    userId: 'queryhub1',
    queryId: 'q01mzpb01org',
  },
]
