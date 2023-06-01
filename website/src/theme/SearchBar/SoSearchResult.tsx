import React from 'react';
import clsx from 'clsx';
import {AnswerIcon, CheckMarkIcon, QuestionIcon} from './SoIcons';

export const SoSearchResult = ({
                                 query,
                                 results,
                               }) => {
  return (
    <div className="so-results-container">
      {results && results.items.length > 0 && <div className="so-results-link">See all results on <a target="_blank"
                                                                                                     href={`https://stackoverflow.com/search?q=${encodeURIComponent(`[nearprotocol] ${query}`)}`}>StackOverflow</a>
      </div>}
      {results && results.items.length > 0 &&
        results.items.map((item, index) => {
          const creationDate = (new Date(item.creation_date * 1000)).toDateString();
          return (
            <div key={index} className={clsx('so-results-item', {'so-has-accepted-answer': item.has_accepted_answer})}
                 data-item-type={item.item_type}>
              <div className="so-result-sidebar">
                {item.item_type === 'question' &&
                  <div
                    className={clsx('so-answer-count', {'has-answers': item.answer_count > 0})}>
                    {item.has_accepted_answer &&
                      <CheckMarkIcon/>}{item.answer_count} {item.answer_count === 1 ? 'answer' : 'answers'}
                  </div>
                }
                {item.item_type === 'answer' &&
                  <div></div>
                }
              </div>
              <div className="so-result-content">
                <h5>
                  {item.item_type === 'answer' && <AnswerIcon/>}
                  {item.item_type === 'question' && <QuestionIcon/>}
                  <a target="_blank" href={`https://stackoverflow.com/questions/${item.question_id}`}
                     dangerouslySetInnerHTML={{__html: item.title}}
                  ></a>
                </h5>
                <div className="so-result-excerpt"
                     dangerouslySetInnerHTML={{__html: item.excerpt}}></div>
                <div className="so-result-meta">
                  <div className="so-result-tags">
                    {
                      Array.isArray(item.tags) && item.tags.map(t => <span key={t} className="so-result-tag">{t}</span>)
                    }
                  </div>
                  <div className="so-result-date">
                    {item.item_type === 'question' &&
                      <div className="so-result-date-question">asked {creationDate}</div>
                    }
                    {item.item_type === 'answer' &&
                      <div className="so-result-date-answer">answered {creationDate}</div>
                    }
                  </div>

                </div>
              </div>
            </div>

          );
        })
      }
      {results && results.items.length === 0 &&
        <div className="so-no-results">No results for <strong>"{query}"</strong></div>
      }
      {!results &&
        <div></div>
      }
    </div>
  );
}
