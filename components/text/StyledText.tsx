import { Text, TextProps } from '../Themed';

export function ClashGrotesk(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'ClashGrotesk' }]} />;
}

export function ClashGroteskBold(props: TextProps) {
  return <Text {...props} style={[props.style, {fontFamily: 'ClashGroteskBold'}]} />;
}

export function ClashGroteskLight(props: TextProps) {
  return <Text {...props} style={[props.style, {fontFamily: 'ClashGroteskLight'}]} />;
}