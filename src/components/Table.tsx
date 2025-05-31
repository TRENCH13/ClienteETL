import { ScrollView, Text, View, Pressable } from "react-native";
import React from "react";

// Tipos
type HeaderType = {
    key: string;
    label: string;
    sortable?: boolean;
    ascending?: boolean;
};

type ReusableTableProps<T> = {
    headers: HeaderType[];
    data: T[];
    isDark?: boolean;
    onSort?: (key: string) => void;
    renderRow: (item: T) => (string | number | React.ReactNode)[];
    onRowClick?: (item: T) => void; // NUEVO
};

export default function ReusableTable<T>({
                                             headers,
                                             data,
                                             isDark = false,
                                             onSort,
                                             renderRow,
                                             onRowClick,
                                         }: ReusableTableProps<T>) {
    return (
        <>
            {/* Header */}
            <View style={{ flexDirection: 'row', backgroundColor: isDark ? '#1e1e1e' : '#F1F9F5', paddingVertical: 10, paddingHorizontal: 10, width: '100%' }}>
                {headers.map((header: HeaderType, idx: number) => (
                    <Pressable
                        key={idx}
                        onPress={() => onSort?.(header.key)}
                        style={{
                            flex: 1,
                            paddingHorizontal: 12,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{
                            fontWeight: 'bold',
                            color: isDark ? '#fff' : '#000',
                            textAlign: 'center',
                            fontSize: 14,
                        }}>
                            {header.label} {header.sortable ? (header.ascending ? '⬇️' : '⬆️') : ''}
                        </Text>
                    </Pressable>
                ))}
            </View>

            {/* Data Rows */}
            <ScrollView
                style={{ width: '100%' }}
            >
                {data.map((item, index) => {
                    const row = renderRow(item);
                    return (
                        <Pressable
                            key={index}
                            onPress={() => onRowClick?.(item)}
                            style={{
                                flexDirection: 'row',
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                backgroundColor: isDark ? '#111' : '#fff',
                                borderBottomWidth: 1,
                                borderBottomColor: '#ccc',
                            }}
                        >
                            {row.map((cell, i) => (
                                <View
                                    key={i}
                                    style={{
                                        flex: 1,
                                        marginHorizontal: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: isDark ? '#fff' : '#000',
                                            fontSize: 14,
                                            textAlign: 'center',
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        {cell}
                                    </Text>
                                </View>
                            ))}
                        </Pressable>
                    );
                })}
            </ScrollView>
        </>
    );
}
