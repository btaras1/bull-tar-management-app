import React from 'react';
import {StatCard,
        Title,
        Content,
        Row,
        Item,
        ItemTitle,
        Value       
} from './CardStyle';

const Card = ({title, data, mating}) =>{
    return(
        <>
        { mating ? (
        <StatCard>
                <Title>{title}</Title>
                <Content>
                {data.map(content =>
                    <Row>
                    <Item>
                        <ItemTitle>Ime</ItemTitle>
                        <Value>{content.name}</Value>
                    </Item>
                    <Item>
                        <ItemTitle>Broj parenja</ItemTitle>
                        <Value>{content.cnt}</Value>
                    </Item>
                </Row>
                )}
                </Content>
            </StatCard>
        
        ) : (
            <StatCard>
            <Title>{title}</Title>
            <Content>
                <Row count={true}>
                    <Item >
                        <Value count={true}>{data}</Value>
                    </Item>
                </Row>
            </Content>
        </StatCard>
        )}
</>
    );
}

export default Card;