import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { isRegexpStringMatch, useCollapsible, Collapsible } from '@docusaurus/theme-common';
import { isSamePath, useLocalPathname } from '@docusaurus/theme-common/internal';
import NavbarNavLink from '@theme/NavbarItem/NavbarNavLink';
import NavbarItem from '@theme/NavbarItem';
import styles from './styles.module.css';

function DropdownItem({ to, label, icon, description, onMouseOver, onMouseOut, isCategory = false, isSelected = false, isDimmed = false, ...props }) {
  return (
    <li
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onMouseOver}
      className={clsx(
        styles.dropDownItem,
        isCategory && styles.categoryItem,
        isCategory && isSelected && styles.selectedCategory,
        isDimmed && styles.dimmed
      )}
    >
      <a href={to} className={clsx(styles.dropdownItemLink)}>
        <div className={clsx(styles.dropdownItemContainer)}>
          {!isCategory && icon &&
            <img
              className={clsx(styles.dropdownItemImg)}
              src={icon}
              alt={label}
            />
          }
          <div className={clsx(styles.dropdownItemText)}>
            <span className={clsx(styles.dropdownItemLabel)}>{label}</span>
            <span className={clsx(styles.dropdownItemDescription)}>{description}</span>
          </div>
        </div>
      </a>
    </li>
  )
}

function isItemActive(item, localPathname) {
  if (isSamePath(item.to, localPathname)) {
    return true;
  }
  if (isRegexpStringMatch(item.activeBaseRegex, localPathname)) {
    return true;
  }
  if (item.activeBasePath && localPathname.startsWith(item.activeBasePath)) {
    return true;
  }
  return false;
}
function containsActiveItems(items, localPathname) {
  return items.some((item) => isItemActive(item, localPathname));
}
function DropdownNavbarItemDesktop({ items, position, className, onClick, ...props }) {
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [subitems, setSubItems] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current || dropdownRef.current.contains(event.target)) {
        return;
      }
      setShowDropdown(false);
      setSubItems([]);
      setSelectedCategoryIndex(-1);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('focusin', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('focusin', handleClickOutside);
    };
  }, [dropdownRef]);

  const active = containsActiveItems(items, useLocalPathname()) && 'navbar__link--active';

  const handleCategoryHover = (childItemProps, index) => {
    setSubItems(childItemProps.subitems || []);
    setSelectedCategoryIndex(index);
  };

  const handleMenuLeave = () => {
    setSubItems([]);
    setSelectedCategoryIndex(-1);
    setShowDropdown(false);
  };

  const handleNavbarItemEnter = () => {
    setShowDropdown(true);
  };

  return (
    <div
      ref={dropdownRef}
      className={clsx('navbar__item', 'dropdown', 'dropdown--hoverable', {
        'dropdown--right': position === 'right',
        'dropdown--show': showDropdown,
      })}
      onMouseEnter={handleNavbarItemEnter}
      onMouseLeave={handleMenuLeave}
      onClick={handleNavbarItemEnter}
    >
      <NavbarNavLink
        aria-haspopup="true"
        aria-expanded={showDropdown}
        role="button"
        // # hash permits to make the <a> tag focusable in case no link target
        // See https://github.com/facebook/docusaurus/pull/6003
        // There's probably a better solution though...
        href={props.to ? undefined : '#'}
        className={clsx(`navbar__link ${active}`, className)}
        {...props}
        onClick={props.to ? undefined : (e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            setShowDropdown(!showDropdown);
          }
        }}
      >
        {props.children ?? props.label}
      </NavbarNavLink>

      {showDropdown && (
        <div
          className={clsx(styles.dropdownMenu, 'dropdown__menu')}
        >
          <div className={clsx(styles.dropdownMenuLeft)}>
            <ul>
              {items.map((childItemProps, i) => (
                <DropdownItem
                  key={i}
                  {...childItemProps}
                  isCategory={childItemProps.subitems}
                  isSelected={selectedCategoryIndex === i}
                  isDimmed={selectedCategoryIndex !== -1 && selectedCategoryIndex !== i}
                  onMouseOver={() => handleCategoryHover(childItemProps, i)}
                />
              ))}
            </ul>
          </div>

          {subitems.length > 0 && (
            <>
              <div className={clsx(styles.menuDivider)}></div>
              <div className={clsx(styles.dropdownMenuRight)}>
                <ul>
                  {subitems.map((sub, i) => (
                    <DropdownItem
                      key={i}
                      {...sub}
                      isCategory={false}
                    />
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function DropdownNavbarItemMobile({
  items,
  className,
  position,
  onClick,
  ...props
}) {
  const localPathname = useLocalPathname();
  const containsActive = containsActiveItems(items, localPathname);
  const { collapsed, toggleCollapsed, setCollapsed } = useCollapsible({
    initialState: () => !containsActive,
  });

  useEffect(() => {
    if (containsActive) {
      setCollapsed(!containsActive);
    }
  }, [localPathname, containsActive, setCollapsed]);
  console.log(items);
  return (
    <li
      className={clsx('menu__list-item', {
        'menu__list-item--collapsed': collapsed,
      })}
    >
      <NavbarNavLink
        role="button"
        className={clsx(
          styles.dropdownNavbarItemMobile,
          'menu__link menu__link--sublist menu__link--sublist-caret',
          className,
        )}
        {...props}
        onClick={(e) => {
          e.preventDefault();
          toggleCollapsed();
        }}
      >
        {props.children ?? props.label}
      </NavbarNavLink>
      <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
        {items.map((childItemProps, i) => (
          <NavbarItem
            mobile
            isDropdownItem
            onClick={onClick}
            activeClassName="menu__link--active"
            {...childItemProps}
            key={i}
          />
          )
        )}
      </Collapsible>
    </li>
  );
}

export default function DropdownNavbarItem({ mobile = false, ...props }) {
  const Comp = mobile ? DropdownNavbarItemMobile : DropdownNavbarItemDesktop;
  return <Comp {...props} />;
}
