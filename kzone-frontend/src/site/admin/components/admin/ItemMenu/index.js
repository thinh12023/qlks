import React from "react";
import { Link } from "react-router-dom";
import Collapse from "@kunukn/react-collapse";
function index(props) {
  const onClick = (item) => (e) => {
    if (props.toggle) {
      props.toggle(item);
    }
    if (!item.href || item.href === "#") {
      e.preventDefault();
      e.stopPropagation();
    } else {
    }
  };
  return (
    <li>
      {props.item.href && (!props.item.menus || !props.item.menus.length) ? (
        <Link
          onClick={onClick(props.item)}
          to={props.item.href}
          title={props.item.name}
          data-filter-tags={props.item.name + " " + props.item.filter}
          className=" waves-effect waves-themed"
        >
          <i className={props.item.icon}></i>
          <span className="nav-link-text">{props.item.name}</span>
        </Link>
      ) : (
        <a
          onClick={onClick(props.item)}
          href="#"
          title={props.item.name}
          data-filter-tags={props.item.name + " " + props.item.filter}
          className=" waves-effect waves-themed"
        >
          <i className={props.item.icon}></i>
          <span className="nav-link-text">{props.item.name}</span>
          <b className="collapse-sign">
            {props.item.open ? (
              <em className="fal fa-angle-down"></em>
            ) : (
              <em className="fal fa-angle-up"></em>
            )}
          </b>
        </a>
      )}
      {props.item.menus && props.item.menus.length ? (
        <Collapse
          elementType="ul"
          isOpen={props.item.open}
          collapseHeight="0px"
          transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`}
        >
          {props.item.menus.map((item, index) => {
            let isAuthorized = false;
            const { userType = [] } = item;
            if (!userType.length) {
              isAuthorized = true;
            } else {
              const { authorities = [] } = props.auth;
              isAuthorized = userType.some((item) =>
                authorities.includes(item)
              );
            }
            if (isAuthorized)
              return (
                <li key={index}>
                  <Link
                    onClick={onClick(item)}
                    to={item.href}
                    title={item.name}
                    data-filter-tags={item.name + " " + item.filter}
                    className=" waves-effect waves-themed"
                  >
                    <span className="nav-link-text">{item.name}</span>
                  </Link>
                </li>
              );
            return null;
          })}
        </Collapse>
      ) : null}
    </li>
  );
}

export default index;
