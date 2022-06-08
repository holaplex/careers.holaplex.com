import React, { Component } from 'react'
import styled from '@emotion/styled';

const StyledButton = styled.button`
	background: linear-gradient(180deg, #FDD85C 0%, #F5C927 100%);
	color: white;
	&.secondary {
		background: #8D8D8D;
	}
`

const Button = (props) => {
	const { children, className } = props;
	return (
		<StyledButton className={"rounded font-bold py-1 px-2 text-xs " + className}>
			{children}
		</StyledButton>
	)
}

export default Button
