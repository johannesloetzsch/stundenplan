import { useEffect, useRef } from 'react';
import { DataSet } from 'vis-data';
import { DataSetDataItem, Timeline, TimelineGroup, TimelineItem, TimelineOptions } from 'vis-timeline/standalone';

interface VisTimelineProps {
  items: TimelineItem[];
  groups: TimelineGroup[];
}

const VisTimeline = ({ items, groups }: VisTimelineProps) => {
  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (timelineRef.current) {
      const data = new DataSet(items) as DataSetDataItem;
 
      const options: TimelineOptions = {orientation: 'top', horizontalScroll: true, zoomKey: 'shiftKey'} as unknown as TimelineOptions;

      const timeline = new Timeline(timelineRef.current, data, groups, options);
  
      return () => {
        timeline.destroy();
      };
    };
  }, [items]);

  return <div ref={timelineRef} style={{ minHeight: '400px', minWidth: '400px' }} />;
};

export default VisTimeline;
