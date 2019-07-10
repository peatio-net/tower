import { getCode } from 'country-list';
import {Moment} from 'moment';
import * as React from 'react';
import { SearchBar, SelectItem } from '../../components';

export interface SearchBarElementInterface {
    selectedSearchValue: SelectItem;
    selectedValueData: string;
    index: number;
}

interface SearchBarWrapperState {
    selectedItems: SelectItem[];
    selectedMainItem: SelectItem;
    selectedMainItemValue: string;
    elems: SearchBarElementInterface[];
    selectedStartDate?: Moment | null;
    selectedEndDate?: Moment | null;
}

export interface SearchBarRequestInterface {
    property: string;
    value: string;
}

export interface SearchBarWrapperProps {
    selectedItems: SelectItem[];
    handleSearchRequest: (data: SearchBarRequestInterface[]) => void;
    handleClearSearchRequest: () => void;
}

class SearchBarWrapper extends React.Component<SearchBarWrapperProps, SearchBarWrapperState> {
    constructor(props: SearchBarWrapperProps) {
        super(props);

        const defaultItems = [{
            value: '',
            label: '',
            checked: false,
        }];

        this.state = {
            selectedItems: props.selectedItems.length ? props.selectedItems : defaultItems,
            selectedMainItem: props.selectedItems.length ? props.selectedItems[0] : defaultItems[0],
            selectedMainItemValue: '',
            elems: [],
            selectedStartDate: null,
            selectedEndDate: null,
        };
    }

    public componentDidMount() {
        const items = this.state.selectedItems;
        items[0].checked = true;

        this.setState({
            selectedItems: items,
        });
    }

    public render() {
        const {
            selectedItems,
            selectedMainItem,
            selectedMainItemValue,
            selectedStartDate,
            selectedEndDate,
        } = this.state;

        return (
            <React.Fragment>
                <SearchBar
                    index={0}
                    selectedValues={selectedItems}
                    activeItem={selectedMainItem}
                    handleChangeSelect={this.handleChangeSelectedValue}
                    searchValue={selectedMainItemValue}
                    handleChangeSearchValue={this.handleChangeInputValue}
                    handleAddItem={this.addItemElem}
                    handleClear={this.handleClear}
                    handleSendRequest={this.handleSendRequest}
                    startDate={selectedStartDate}
                    endDate={selectedEndDate}
                    handleStartDateChange={this.handleStartDateChange}
                    handleEndDateChange={this.handleEndDateChange}
                    handleEnterPress={this.handleEnterPress}
                />
                {this.getSearchBars()}
            </React.Fragment>
        );
    }

    private getSearchBars = () => {
        const {
            selectedItems,
            elems,
        } = this.state;

        return elems.map((item: SearchBarElementInterface, i: number) => {
            return (
                <SearchBar
                    key={i}
                    index={i + 1}
                    selectedValues={selectedItems}
                    activeItem={item.selectedSearchValue}
                    handleChangeSelect={this.handleChangeSelectedValue}
                    searchValue={item.selectedValueData}
                    handleChangeSearchValue={this.handleChangeInputValue}
                    handleDeleteItem={this.handleDeleteItem}
                    handleEnterPress={this.handleEnterPress}
                />
            );
        });
    };

    private addItemElem = () => {
        const { elems, selectedItems } = this.state;
        const newItems = elems;

        if (newItems.length + 1 < selectedItems.length) {
            const firstUnselectedItem = selectedItems.find(item => !item.checked);

            if (firstUnselectedItem) {
                const updateSelectedItems = selectedItems.indexOf(firstUnselectedItem);
                const newSelectedItems = selectedItems;
                newSelectedItems[updateSelectedItems].checked = true;

                newItems.push({
                    index: elems.length + 1,
                    selectedSearchValue: firstUnselectedItem,
                    selectedValueData: '',
                });

                this.setState({
                    selectedItems: newSelectedItems,
                    elems: newItems,
                });
            }
        }
    };

    private handleDeleteItem = (index: number) => {
        const { elems, selectedItems } = this.state;
        const newElems = elems;
        const newSelectedItems = selectedItems;

        const removedItemIndex = selectedItems.indexOf(newElems[index - 1].selectedSearchValue);

        newSelectedItems[removedItemIndex].checked = false;
        newElems.splice(index - 1, 1);
        newElems.map(item => item.index > index ? item.index = item.index - 1 : item.index);

        this.setState({
            elems: newElems,
            selectedItems: newSelectedItems,
        });
    };

    private handleChangeSelectedValue = (index: number, value: string) => {
        const {
            elems,
            selectedItems,
            selectedMainItem,
        } = this.state;

        if (index === 0) {
            const item = selectedItems.find(e => e.value === value);

            if (item) {
                const selectedIndex = selectedItems.indexOf(item);
                const pastItemIndex = selectedItems.indexOf(selectedMainItem);

                const newItems = selectedItems;
                newItems[pastItemIndex].checked = false;
                newItems[selectedIndex].checked = true;

                this.setState({
                    selectedMainItem: selectedItems[selectedIndex],
                    selectedItems: newItems,
                });
            }
        } else {
            const newElems = elems;
            const item = selectedItems.find(e => e.value === value);

            if (item) {
                const pastItemIndex = selectedItems.indexOf(newElems[index - 1].selectedSearchValue);
                const selectedIndex = selectedItems.indexOf(item);

                const newItems = selectedItems;
                newItems[pastItemIndex].checked = false;
                newItems[selectedIndex].checked = true;
                newElems[index - 1].selectedSearchValue = newItems[selectedIndex];
                this.setState({
                    selectedItems: newItems,
                    elems: newElems,
                });
            }
        }
    };

    private handleChangeInputValue = (index: number, value: string) => {
        const { elems } = this.state;

        if (index === 0) {
            this.setState({
                selectedMainItemValue: value,
            });
        } else {
            const newElems = elems;
            const elem = newElems.find(item => item.index === index);

            if (elem) {
                elem.selectedValueData = value;
                newElems[index - 1] = elem;

                this.setState({
                    elems: newElems,
                });
            }
        }
    };

    private handleEnterPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleSendRequest();
        }
    };

    private handleClear = () => {
        const cleanedSelectedItems = this.props.selectedItems;
        cleanedSelectedItems.map((item: SelectItem, index: number) =>
            index === 0 ? item.checked = true : item.checked = false);

        this.setState({
            selectedItems: cleanedSelectedItems,
            selectedMainItem: this.props.selectedItems[0],
            selectedMainItemValue: '',
            elems: [],
            selectedStartDate: null,
            selectedEndDate: null,
        });

        this.props.handleClearSearchRequest();
    };

    private handleSendRequest = () => {
        const {
            selectedMainItem,
            selectedMainItemValue,
            elems,
            selectedStartDate,
            selectedEndDate,
        } = this.state;

        const firstItem = {
            index: 0,
            selectedSearchValue: selectedMainItem,
            selectedValueData: selectedMainItemValue,
        };

        const requestArray = [...elems, firstItem].map(item => {
            if (item.selectedSearchValue.value === 'country' && getCode(item.selectedValueData) !== undefined) {
                return {
                    property: item.selectedSearchValue.value,
                    value: getCode(item.selectedValueData),
                };
            } else {
                return {
                    property: item.selectedSearchValue.value,
                    value: item.selectedValueData,
                };
            }
        });

        selectedStartDate && requestArray.push({
            property: 'from', value: `${selectedStartDate.startOf('day').unix()}`,
        });

        selectedEndDate && requestArray.push({
            property: 'to', value: `${selectedEndDate.endOf('day').unix()}`,
        });

        (selectedStartDate || selectedEndDate) && requestArray.push({
            property: 'range', value: 'created',
        });

        this.props.handleSearchRequest(requestArray);
    };

    private handleStartDateChange = (date: Moment) => {
        this.setState({
            selectedStartDate: date,
        });
    };

    private handleEndDateChange = (date: Moment) => {
        this.setState({
            selectedEndDate: date,
        });
    };
}

export const SearchBarContainer = SearchBarWrapper;
