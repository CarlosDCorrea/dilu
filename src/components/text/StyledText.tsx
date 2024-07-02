import { Text, TextProps } from '@/components/Themed';

export function Montserrat(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Montserrat' }]} />;
}

export function MontserratBold(props: TextProps) {
  return <Text {...props} style={[props.style, {fontFamily: 'MontserratBold'}]} />;
}

export function MontserratLight(props: TextProps) {
  return <Text {...props} style={[props.style, {fontFamily: 'MontserratLight'}]} />;
}