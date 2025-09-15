import { FunctionComponent, useState, useRef, useEffect } from 'react';
import './styles.scss';
import Icon from '@/components/icon/icon';
import ButtonIcon from '@/components/button-icon/button-icon';

export interface TabItem {
  title: string;
  clickHandle: () => void;
}

export interface SortOption {
  label: string;
  value: string;
  icon: string;
}

interface TableFilterProps {
  tabItems: TabItem[];
  defaultActiveIndex?: number;
  onSort?: (sortBy: string, direction: 'asc' | 'desc') => void;
  currentSortField?: string;
  currentSortDirection?: 'asc' | 'desc';
  sortOptions?: SortOption[]; // Make sort options configurable
}

const TableFilter: FunctionComponent<TableFilterProps> = ({
  tabItems,
  defaultActiveIndex = 0,
  onSort,
  currentSortField = 'createdAt',
  currentSortDirection = 'desc',
  sortOptions, // Accept custom sort options
  ...rest
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [showSortOverlay, setShowSortOverlay] = useState(false);
  const [currentSort, setCurrentSort] = useState<{ field: string, direction: 'asc' | 'desc' }>({
    field: currentSortField,
    direction: currentSortDirection
  });
  const sortOverlayRef = useRef<HTMLDivElement>(null);

  // Default sort options for clients (fallback)
  const defaultSortOptions: SortOption[] = [
    { label: 'Name Asc', value: 'firstName_asc', icon: 'arrow_downward' },
    { label: 'Name Desc', value: 'firstName_desc', icon: 'arrow_upward' },
    { label: 'Newly created', value: 'createdAt_desc', icon: 'clock_arrow_down' },
    { label: 'Oldest created', value: 'createdAt_asc', icon: 'clock_arrow_up' },
  ];

  // Use provided sort options or fall back to default
  const activeSortOptions = sortOptions || defaultSortOptions;

  // Update local state when props change
  useEffect(() => {
    setCurrentSort({
      field: currentSortField,
      direction: currentSortDirection
    });
  }, [currentSortField, currentSortDirection]);

  // Close overlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortOverlayRef.current && !sortOverlayRef.current.contains(event.target as Node)) {
        setShowSortOverlay(false);
      }
    };

    if (showSortOverlay) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSortOverlay]);

  const handleTabClick = (index: number, item: TabItem) => {
    setActiveIndex(index);
    item.clickHandle();
  };

  const handleSortToggle = () => {
    setShowSortOverlay(!showSortOverlay);
  };

  const handleSortSelect = (option: SortOption) => {
    const [field, direction] = option.value.split('_') as [string, 'asc' | 'desc'];
    setCurrentSort({ field, direction });
    setShowSortOverlay(false);

    if (onSort) {
      onSort(field, direction);
    }
  };

  const getCurrentSortLabel = () => {
    const currentOption = activeSortOptions.find(opt => opt.value === `${currentSort.field}_${currentSort.direction}`);
    return currentOption?.label || 'Sort';
  };

  return (
    <div className="table-filter">
      <div style={{ width: '90%' }}>
        <div className="tab-group">
          {tabItems.map((item, index) => {
            return (
              <button
                className={`tab-item ${activeIndex === index ? 'active' : ''}`}
                key={index}
                onClick={() => handleTabClick(index, item)}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="actions">
        <div className="sort-container" ref={sortOverlayRef}>
          <ButtonIcon
            className={`btn-sort ${showSortOverlay ? 'active' : ''}`}
            icon='swap_vert'
            onClick={handleSortToggle}
          />

          {showSortOverlay && (
            <div className="sort-overlay">
              <div className="sort-header">
                <span>Sort by</span>
              </div>
              {activeSortOptions.map((option, index) => (
                <button
                  key={index}
                  className={`sort-option ${`${currentSort.field}_${currentSort.direction}` === option.value ? 'active' : ''}`}
                  onClick={() => handleSortSelect(option)}
                >
                  <Icon iconName={option.icon} />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableFilter;
