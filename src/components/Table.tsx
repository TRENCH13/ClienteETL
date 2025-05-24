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
};

export default function ReusableTable<T>({
                                             headers,
                                             data,
                                             isDark = false,
                                             onSort,
                                             renderRow,
                                         }: ReusableTableProps<T>) {
    return (
        <>
            {/* Header */}
            <View style={{ flexDirection: 'row', backgroundColor: isDark ? '#1e1e1e' : '#F1F9F5', padding: 10 }}>
                {headers.map((header: HeaderType, idx: number) => (
                    <Pressable
                        key={idx}
                        style={{ flex: 1, alignItems: 'center' }}
                        onPress={() => onSort?.(header.key)}
                    >
                        <Text style={{ fontWeight: 'bold', color: isDark ? '#fff' : '#000' }}>
                            {header.label} {header.sortable ? (header.ascending ? '⬇️' : '⬆️') : ''}
                        </Text>
                    </Pressable>
                ))}
            </View>

            {/* Data Rows */}
            <ScrollView>
                {data.map((item, index) => {
                    const row = renderRow(item);
                    return (
                        <View
                            key={index}
                            style={{
                                flexDirection: 'row',
                                padding: 10,
                                backgroundColor: isDark ? '#111' : '#fff',
                                borderBottomWidth: 1,
                                borderBottomColor: '#ccc',
                            }}
                        >
                            {row.map((cell, i) => (
                                <Text
                                    key={i}
                                    style={{ flex: 1, color: isDark ? '#fff' : '#000', textAlign: 'center' }}
                                >
                                    {cell}
                                </Text>
                            ))}
                        </View>
                    );
                })}
            </ScrollView>
        </>
    );
}
