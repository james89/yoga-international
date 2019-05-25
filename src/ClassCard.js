import React from 'react';

const ClassCard = (c) => {
  const { class: { thumb, url, title, teacher, body_snippet, level, style, duration } } = c  
  const classTeacher = teacher[0].replace(/-/g, ' ')
  
  return (
    <div className="m-2">
      <div className="yi-card-small-centered-hover-wrapper">
        <a href={url} className="yi-card-small yi-card-small--hoverable">
          <div className="yi-card-small__image">
            <img src={thumb} alt="Card" />
          </div>
          <div className="yi-card-small__content">
            <h4 className="yi-card-small__title yi-card-small__title--two-line yi-card-small--hover-hide">{title}</h4>
            <h4 className="yi-card-small__title yi-card-small__title--two-line yi-card-small--hover-show">{title}</h4>
          <div className="yi-card-small__author yi-card-small--hover-hide">{ classTeacher }</div>
          <div className="yi-card-small__author yi-card-small--hover-show yi-card-small__author--full">{ classTeacher } | { style }</div>
            <p className="yi-card-small__snippet mt-1">{ body_snippet }</p>
          </div>
          <div className="yi-card-small__upper-right"></div>
          <div className="yi-card-small__lower-background"></div>
          <div className="yi-card-small__lower-left">
            <span className="yi-card-small__level"> { level }</span>
          </div>
          <div className="yi-card-small__lower-mid yi-card-small--hover-show-fade">
            <div>
              <i className="icon-intensity"></i>
              <span className="yi-card-small__intensity"></span>
            </div>
          </div>
          <div className="yi-card-small__lower-right">
            <i className="icon-clock" style={{'fontSize': '12px'}}></i>
            <span className="yi-card-small__duration" data-testid="class-card-duration">{ duration }</span>
          </div>
        </a>
      </div>
    </div>

  );
};

export default ClassCard;