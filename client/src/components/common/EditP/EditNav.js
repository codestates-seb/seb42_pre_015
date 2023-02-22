import styled from 'styled-components';

const QENavContainer = styled.div`
  width: 365px;
  margin-top: 5px;
  z-index: 10;
  border-radius: 3px;
  border: 1px solid rgb(241, 229, 188);
`;
const QENavTop = styled.div`
  text-align: left;
  padding: 12px 15px;
  background-color: rgb(251, 243, 213);
  border-bottom: 1px solid rgb(241, 229, 188);
  > p {
    font-size: 15px;
  }
`;
const QENavMain = styled.div`
  padding: 16px 15px;
  text-align: left;
  background-color: #fdf7e2;
  > p {
    white-space: normal;
    margin-bottom: 10px;
  }
  ul {
    list-style-type: disc;
    padding-left: 13px;
  }
  > ul > li {
    white-space: normal;
    margin-bottom: ${props => props.liMargin || '5px'};
  }
  > ul > li > div {
    background-color: rgb(241, 242, 243);
    padding: 8px;
    margin: 4px 0;
    max-width: 170px;
  }
`;
const QENavAdiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  a {
    margin-bottom: 5px;
  }
`;
export function EditTagNav() {
  return (
    <QENavContainer>
      <QENavTop>
        <p>How to Tag</p>
      </QENavTop>
      <QENavMain>
        <p>
          A tag is a keyword or label that categorizes your question with other,
          similar questions. Choose one or more (up to 5) tags that will help
          answerers to find and interpret your question.
        </p>
        <ul>
          <li>complete the sentence: my question is about...</li>
          <li>
            use tags that describe things or concepts that are essential, not
            incidental to your question
          </li>
          <li>favor using existing popular tags</li>
          <li>read the descriptions that appear below the tag</li>
        </ul>
        <p>
          If your question is primarily about a topic for which you can&lsquo;t
          find a tag:
        </p>
        <ul>
          <li>
            combine multiple words into single-words with hyphens (e.g.
            ruby-on-rails), up to a maximum of 35 characters
          </li>
          <li>
            creating new tags is a privilege; if you can&lsquo;t yet create a
            tag you need, then post this question without it, then ask the
            community to create it for you
          </li>
        </ul>
        <QENavAdiv>
          <a href='/#'>popular tags</a>
        </QENavAdiv>
      </QENavMain>
    </QENavContainer>
  );
}

export function EditTitleNav() {
  return (
    <QENavContainer>
      <QENavTop>
        <p>How to Edit</p>
      </QENavTop>
      <QENavMain liMargin='10px'>
        <ul>
          <li>Correct minor typos or mistakes</li>
          <li>Clarify meaning without changing it</li>
          <li>Add related resources or links</li>
          <li>Always respect the author’s intent</li>
          <li>Don’t use edits to reply to the author</li>
        </ul>
      </QENavMain>
    </QENavContainer>
  );
}
export function EditBodyNav() {
  return (
    <QENavContainer>
      <QENavTop>
        <p>How to Format</p>
      </QENavTop>
      <QENavMain liMargin='10px'>
        <ul>
          <li>
            create code fences with backticks ` or tildes ~
            <div>
              <p>```</p>
              <p>like so</p>
              <p>```</p>
            </div>
          </li>
          <li>
            add language identifier to highlight code
            <div>
              <p>```python</p>
              <p>def function(foo):</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;print(foo)</p>
              <p>```</p>
            </div>
          </li>
          <li>put returns between paragraphs</li>
          <li>for linebreak add 2 spaces at end</li>
          <li>_italic_ or **bold**</li>
          <li>indent code by 4 spaces</li>
          <li>backtick escapes `like _so_`</li>
          <li>quote by placing &gt; at start of line</li>
          <li>_italic_ or **bold**</li>
        </ul>
        <QENavAdiv>
          <a href='/#'>formatting help »</a>
          <a href='/#'>asking help »</a>
        </QENavAdiv>
      </QENavMain>
    </QENavContainer>
  );
}

const AnswerNavContainer = styled.div`
  margin-top: 23px;
`;

export function AnswerNav() {
  return (
    <AnswerNavContainer>
      <EditTitleNav />
      <EditBodyNav />
      <EditTagNav />
    </AnswerNavContainer>
  );
}
