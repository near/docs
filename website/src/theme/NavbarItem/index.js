import NavbarItem from '@theme-original/NavbarItem';
import LoginButton from './login-button'

export default function NavbarItemWrapper(props) {
  if (props.href === 'login') return <LoginButton {...props} />

  const newProps = { ...props };
  if ('subitems' in props) newProps.items = props.subitems; // Backward compatibility for subitems
  return <NavbarItem {...newProps} />
}
