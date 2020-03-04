import { Typography } from 'antd';
import React from 'react';

const { Paragraph } = Typography;

class HomePage extends React.Component {
    render() {
        return(
            <div>
                <Paragraph ellipsis>
                Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
                Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
                a design language for background applications, is refined by Ant UED Team. Ant Design, a
                design language for background applications, is refined by Ant UED Team. Ant Design, a design
                language for background applications, is refined by Ant UED Team. Ant Design, a design
                language for background applications, is refined by Ant UED Team.
                </Paragraph>

                <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
                Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
                a design language for background applications, is refined by Ant UED Team. Ant Design, a
                design language for background applications, is refined by Ant UED Team. Ant Design, a design
                language for background applications, is refined by Ant UED Team. Ant Design, a design
                language for background applications, is refined by Ant UED Team.
                </Paragraph>
            </div>
        )
    }
}

export default HomePage;