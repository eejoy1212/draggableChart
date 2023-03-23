// import { useState } from 'react';
// import { Responsive, WidthProvider } from "react-grid-layout";
// // import GridLayout from "react-grid-layout";
// import 'react-grid-layout/css/styles.css'
// import 'react-resizable/css/styles.css'
// import "./App.css";
// import WidgetCard from './WidgetCard';
// const ResponsiveGridLayout = WidthProvider(Responsive);
// function App() {
//     const layout = [
//         { i: "key값1", x: 0, y: 0, w: 1, h: 1 },
//         { i: "key값2", x: 1, y: 0, w: 1, h: 1 },
//         { i: "key값3", x: 2, y: 0, w: 1, h: 1 },
//         { i: "key값4", x: 3, y: 0, w: 1, h: 1 },
//         { i: "key값5", x: 4, y: 0, w: 1, h: 1 }
//       ];
//   const widgetList = [
//     { i: "a", x: 0, y: 0, w: 25, h: 10, 
//     //static이면 안움직임.
//     // static: true
//    },
//     { i: "b", x: 25, y: 0, w: 25, h: 10,},
//     { i: "c", x: 50, y: 0, w: 25, h: 10 },
//     { i: "d", x: 75, y: 0, w: 25, h:10 },
//     ////////////
//     { i: "e", x: 0, y: 0, w: 25, h:10, 
//     //static이면 안움직임.
//     // static: true
//    },
//     { i: "b", x: 25, y: 0, w: 25, h:10,},
//     { i: "c", x: 50, y: 0, w: 25, h: 10 },
//     { i: "d", x: 75, y: 0, w: 25, h: 10 },
//   ];
//   // var layouts = getLayoutsFromSomewhere();
//   const DashboardDetailView = () => {
// 		// responsive grid에 필요한 state
//     const [state, setState] = useState({
//         breakpoints: 'lg',
//         layouts: { lg: [] },
//     })

//     // grid-layout 변경 시 사용
//     const onLayoutChange = (layout, layouts) => {
//         // console.log('layouts', layouts, layout)
//         setState((state) => ({
//             ...state,
//             layouts: layouts,
//         }))
//     }

//     // breakpoint 변경
//     const onBreakPointChange = (breakpoint) => {
//         // console.log(breakpoint) // lg or md or sm or xs or xxs
//         setState((state) => ({
//             ...state,
//             breakpoints: breakpoint,
//         }))
//     }
		
//   return (
//     <div className='App'>
//       <ResponsiveGridLayout
//             layouts={state.layouts}
//             breakpoints={{
//                 lg: 1200,
//                 md: 996,
//                 sm: 768,
//                 xs: 480,
//                 xxs: 0,
//             }}
//             cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
//             rowHeight={150}
//             width={1000}
//             onLayoutChange={onLayoutChange}
//             onBreakpointChange={onBreakPointChange}
//             isResizable={true}
//         >
//             {widgetList.map((widget, index) => (
//                 // <Grid item key={widget.widgetId}>
//                     <WidgetCard 
//                         key={widget.i}
//                         // title={widget.widgetTitle}
//                         // widgetInfo={widget}
//                         // getWidgetData={getWidgetData}
//                     >
//                         {/* <WidgetComponent widgetInfo={widget} /> */}
//                     </WidgetCard>
//                 // </Grid>
//             ))}
//         </ResponsiveGridLayout>
//     </div>
//   );
// }
// }
// export default App;
///////////
import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import "./App.css";
const ReactGridLayout = WidthProvider(RGL);
  const srcCnt=8;
export default class App extends React.PureComponent {

  static defaultProps = {
    className: "layout",
    //아이템 만드는 애==items
    items: srcCnt*2,
    //얜 뭐지??..
    rowHeight: 100,
    onLayoutChange: function() {},
    cols: 16*10
  };

  constructor(props) {
    super(props);

    const layout = this.generateLayout();
    this.state = { layout };
  }
//카드 만드는 애
  generateDOM() {
    return _.map(_.range(this.props.items), function(i) {
      return (
        <div key={i}>
          <span className="text">{i}-SRC</span>
        </div>
      );
    });
  }

  generateLayout() {
    const p = this.props;
    return _.map(new Array(p.items), function(item, i) {
      const y = 2;//_.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: i,//(i * 2) % 12,
        y: y,//Math.floor(i / 6) * y,
        w: 1,
        h:5,//y,
        i: i.toString()
      };
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <div className="App"><ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        {...this.props}
      >
        {this.generateDOM()}
      </ReactGridLayout></div>
      
    );
  }
}

// if (process.env.STATIC_EXAMPLES === true) {
//   import("../test-hook.jsx").then(fn => fn.default(App));
// }
